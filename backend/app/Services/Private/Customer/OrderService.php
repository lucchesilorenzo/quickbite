<?php

declare(strict_types=1);

namespace App\Services\Private\Customer;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Exceptions\Private\Customer\OrderExpiredException;
use App\Exceptions\Private\Customer\RestaurantNotAvailableException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Models\Order;
use App\Models\Restaurant;
use App\Models\User;
use App\Notifications\Private\Partner\NewOrderReceived;
use App\Services\Shared\LocationService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Throwable;

class OrderService
{
    private const int PER_PAGE = 5;

    public function __construct(
        private readonly LocationService $locationService
    ) {}

    public function getOrders(User $customer): LengthAwarePaginator
    {
        return $customer->orders()
            ->with(['orderItems', 'restaurant.reviews.customer'])
            ->visible()
            ->latest()
            ->paginate(self::PER_PAGE);
    }

    public function getOrder(Order $order): Order
    {
        if ($order->isExpired()) {
            throw new OrderExpiredException();
        }

        $order->load(['orderItems', 'restaurant.reviews.customer']);

        return $order;
    }

    /**
     * @return array{order: Order, stripe_client_secret: string|null}
     */
    public function createOrder(User $customer, array $data): array
    {
        $order = DB::transaction(function () use ($customer, $data) {
            $restaurant = Restaurant::query()->findOrFail($data['restaurant_id']);

            if (! $restaurant->is_open || $data['subtotal'] < $restaurant->min_amount) {
                throw new RestaurantNotAvailableException;
            }

            $locationData = $this->locationService->getLocationData($data);

            if ($locationData === null) {
                throw new LocationNotFoundException;
            }

            $order = Order::query()->create([
                'user_id' => $customer->id,
                'restaurant_id' => $data['restaurant_id'],
                'order_code' => $this->generateOrderCode(),
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'phone_number' => $data['phone_number'],
                'street_address' => $data['street_address'],
                'building_number' => $data['building_number'],
                'postcode' => $data['postcode'],
                'city' => $data['city'],
                'state' => $data['state'],
                'delivery_time' => $data['delivery_time'],
                'notes' => $data['notes'] ?? null,
                'payment_method' => $data['payment_method'],
                'subtotal' => $data['subtotal'],
                'delivery_fee' => $data['delivery_fee'],
                'service_fee' => $data['service_fee'],
                'discount_rate' => $data['discount_rate'],
                'discount' => $data['discount'],
                'total' => $data['total'],
            ]);

            foreach ($data['order_items'] as $item) {
                $order->orderItems()->create([
                    'menu_item_id' => $item['menu_item_id'],
                    'name' => $item['name'],
                    'quantity' => $item['quantity'],
                    'item_total' => $item['item_total'],
                ]);
            }

            if ($data['payment_method'] !== PaymentMethod::ONLINE->value) {
                $order->load(['orderItems', 'restaurant.reviews.customer']);

                foreach ($restaurant->partners as $partner) {
                    $partner->notify(new NewOrderReceived($order, $partner));
                }
            }

            return $order;
        });

        $stripeClientSecret = null;

        if ($data['payment_method'] === PaymentMethod::ONLINE->value) {
            try {
                $stripeClientSecret = $this->createStripePaymentIntent($customer, $order);
            } catch (Throwable $e) {
                $order->delete();

                throw $e;
            }
        }

        $order->load(['orderItems', 'restaurant.reviews.customer']);

        return [
            'order' => $order,
            'stripe_client_secret' => $stripeClientSecret,
        ];
    }

    private function createStripePaymentIntent(User $customer, Order $order): string
    {
        $customer->createOrGetStripeCustomer([
            'name' => mb_trim($customer->first_name . ' ' . $customer->last_name),
        ]);

        $amount = (int) ($order->total * 100);

        $payment = $customer->pay($amount, [
            'metadata' => [
                'order_id' => $order->id,
                'order_code' => (string) $order->order_code,
            ],
            'description' => 'QuickBite order # ' . $order->order_code,
        ]);

        $order->update([
            'payment_intent_id' => $payment->asStripePaymentIntent()->id,
            'payment_status' => PaymentStatus::PENDING->value,
        ]);

        return $payment->clientSecret();
    }

    /**
     * Generate a random order code.
     */
    private function generateOrderCode(): int
    {
        do {
            $code = random_int(100000, 999999);
        } while (
            Order::query()
                ->where('order_code', $code)
                ->exists()
        );

        return $code;
    }
}
