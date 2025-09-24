<?php

declare(strict_types=1);

namespace App\Services\Private\Customer;

use App\Exceptions\Private\Customer\CustomerRestaurantNotAvailableException;
use App\Models\Order;
use App\Models\Restaurant;
use App\Models\User;
use App\Notifications\NewOrderReceived;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class CustomerOrderService
{
    private const int PER_PAGE = 5;

    public function getOrders(User $customer): LengthAwarePaginator
    {
        return $customer->orders()
            ->with(['orderItems', 'restaurant.reviews.customer'])
            ->orderByDesc('created_at')
            ->paginate(self::PER_PAGE);
    }

    public function getOrder(Order $order): Order
    {
        $order->load(['orderItems', 'restaurant.reviews.customer']);

        return $order;
    }

    public function createOrder(User $customer, array $data): Order
    {
        return DB::transaction(function () use ($customer, $data) {
            $restaurant = Restaurant::findOrFail($data['restaurant_id']);

            if (! $restaurant->calculateIsOpen() || $data['subtotal'] < $restaurant->min_amount) {
                throw new CustomerRestaurantNotAvailableException;
            }

            $order = Order::create([
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
                'delivery_time' => $data['delivery_time'] === 'asap'
                    ? now()->format('H:i:s')
                    : $data['delivery_time'],
                'notes' => $data['notes'] ?? null,
                'payment_method' => $data['payment_method'],
                'subtotal' => $data['subtotal'],
                'delivery_fee' => $data['delivery_fee'],
                'service_fee' => $data['service_fee'],
                'discount_rate' => $data['discount_rate'],
                'discount' => $data['discount'],
                'total' => $data['total'],
            ]);

            Notification::send($restaurant->partners, new NewOrderReceived($order));

            foreach ($data['order_items'] as $item) {
                $order->orderItems()->create([
                    'menu_item_id' => $item['menu_item_id'],
                    'name' => $item['name'],
                    'quantity' => $item['quantity'],
                    'item_total' => $item['item_total'],
                ]);
            }

            $order->load(['orderItems', 'restaurant.reviews.customer']);

            return $order;
        });
    }

    /**
     * Generate a random order code.
     */
    private function generateOrderCode(): int
    {
        do {
            $code = random_int(100000, 999999);
        } while (Order::where('order_code', $code)->exists());

        return $code;
    }
}
