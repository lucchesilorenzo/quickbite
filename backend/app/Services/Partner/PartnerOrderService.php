<?php

declare(strict_types=1);

namespace App\Services\Partner;

use App\Enums\OrderStatus;
use App\Models\Delivery;
use App\Models\Order;
use App\Models\Restaurant;
use App\Models\User;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class PartnerOrderService
{
    private const PER_PAGE = 5;

    public function getOrders(Restaurant $restaurant): LengthAwarePaginator
    {
        $orders = $restaurant->orders()
            ->with(['orderItems', 'restaurant'])
            ->orderByDesc('created_at')
            ->paginate(self::PER_PAGE);

        return $orders;
    }

    public function updateOrderStatus(Order $order, array $data): Order
    {
        return DB::transaction(function () use ($order, $data) {
            // TODO: move to rider order controller
            if ($data['status'] === OrderStatus::CANCELLED->value) {
                $order->delivery?->update([
                    'cancelled_at' => now(),
                ]);
            }

            if ($data['status'] === OrderStatus::PREPARING->value) {
                $rider = $this->findAvailableRider($order);

                if (! $rider) {
                    throw new Exception('All active riders are currently busy.', 409);
                }

                Delivery::create([
                    'order_id' => $order->id,
                    'rider_id' => $rider->id,
                    'rider_first_name' => $rider->first_name,
                    'rider_last_name' => $rider->last_name,
                    'rider_phone_number' => $rider->phone_number,
                ]);
            }

            $order->update($data);

            return $order;
        });
    }

    private function findAvailableRider(Order $order): ?User
    {
        $rider = $order->restaurant
            ->riders()
            ->where('is_active', true)
            ->get()
            ->first(fn ($rider) => ! Delivery::isRiderBusy($rider->id));

        return $rider;
    }
}
