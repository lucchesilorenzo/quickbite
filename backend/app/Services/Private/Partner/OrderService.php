<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Enums\OrderStatus;
use App\Exceptions\Private\Partner\NoAvailableRidersException;
use App\Models\Delivery;
use App\Models\Order;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class OrderService
{
    private const int PER_PAGE = 5;

    public function getOrders(array $data, Restaurant $restaurant): LengthAwarePaginator
    {
        $status = $data['status'] ?? null;

        return $restaurant->orders()
            ->with(['orderItems', 'restaurant'])
            ->when($status, fn ($query) => $query->where('status', $status))->latest()
            ->paginate(self::PER_PAGE);
    }

    public function updateOrderStatus(array $data, Order $order): Order
    {
        return DB::transaction(function () use ($order, $data): Order {
            // TODO: move to rider order controller
            if ($data['status'] === OrderStatus::CANCELLED->value) {
                $order->delivery?->update([
                    'cancelled_at' => now(),
                ]);
            }

            if ($data['status'] === OrderStatus::PREPARING->value) {
                $rider = $this->findAvailableRider($order);

                if (! $rider instanceof User) {
                    throw new NoAvailableRidersException;
                }

                Delivery::query()->create([
                    'order_id' => $order->id,
                    'rider_id' => $rider->id,
                    'rider_first_name' => $rider->first_name,
                    'rider_last_name' => $rider->last_name,
                    'rider_phone_number' => $rider->phone_number,
                ]);
            }

            $order->update($data);
            $order->unsetRelation('restaurant');

            return $order;
        });
    }

    private function findAvailableRider(Order $order): ?User
    {
        return $order->restaurant
            ->riders()
            ->where('is_active', true)
            ->get()
            ->first(fn ($rider): bool => ! Delivery::isRiderBusy($rider));
    }
}
