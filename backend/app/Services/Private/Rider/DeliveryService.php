<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Exceptions\Private\Rider\InvalidDeliveryStatusException;
use App\Models\Delivery;
use App\Models\Restaurant;
use App\Models\User;
use App\Notifications\Private\Customer\OrderCancelled;
use App\Notifications\Private\Customer\OrderDelivered;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class DeliveryService
{
    private const int PER_PAGE = 10;

    public function getDeliveryHistory(User $rider): LengthAwarePaginator
    {
        $restaurant = Restaurant::getActiveRestaurantForRider($rider);

        return Delivery::query()
            ->with(['order.orderItems'])
            ->whereHas('order', function ($query) use ($restaurant): void {
                $query->where('restaurant_id', $restaurant->id);
            })
            ->where('rider_id', $rider->id)
            ->where(function ($query): void {
                $query
                    ->whereNotNull('delivered_at')
                    ->orWhereNotNull('cancelled_at');
            })
            ->paginate(self::PER_PAGE);
    }

    public function getActiveDelivery(User $rider): ?Delivery
    {
        $restaurant = Restaurant::getActiveRestaurantForRider($rider);

        return Delivery::query()
            ->with(['order.orderItems'])
            ->whereHas('order', function ($query) use ($restaurant): void {
                $query->where('restaurant_id', $restaurant->id);
            })
            ->where('rider_id', $rider->id)
            ->whereNull('delivered_at')
            ->whereNull('cancelled_at')
            ->first();
    }

    public function updateDeliveryStatus(array $data, Delivery $delivery): Delivery
    {
        $deliveryStatus = match ($data['status']) {
            OrderStatus::DELIVERING->value => 'started_at',
            OrderStatus::DELIVERED->value => 'delivered_at',
            OrderStatus::CANCELLED->value => 'cancelled_at',
            default => throw new InvalidDeliveryStatusException
        };

        return DB::transaction(function () use ($data, $delivery, $deliveryStatus): Delivery {
            if ($data['status'] === OrderStatus::DELIVERED->value) {
                if ($delivery->order->payment_method === PaymentMethod::CASH->value) {
                    $delivery->order->update([
                        'payment_status' => PaymentStatus::PAID->value,
                    ]);
                }

                $delivery->order->customer->notify(new OrderDelivered($delivery->order));
            }

            if ($data['status'] === OrderStatus::CANCELLED->value) {
                $delivery->order->customer->notify(new OrderCancelled($delivery->order));
            }

            $delivery->order->update([
                'status' => $data['status'],
            ]);

            $delivery->update([
                $deliveryStatus => now(),
            ]);

            return $delivery->refresh();
        });
    }
}
