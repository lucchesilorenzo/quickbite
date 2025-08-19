<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\UpdateOrderStatus;
use App\Models\Delivery;
use App\Models\Order;
use App\Models\Restaurant;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class PartnerOrderController extends Controller
{
    /**
     * Get restaurant's orders.
     */
    public function getOrders(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewRestaurantOrders', $restaurant);

        try {
            $orders = $restaurant->orders()
                ->with(['orderItems', 'restaurant'])
                ->orderBy('created_at', 'desc')
                ->paginate(5);

            return response()->json($orders, 200);
        } catch (Throwable $e) {
            return response()->json(['message' => 'Could not get orders.'], 500);
        }
    }

    /**
     * Update order status.
     */
    public function updateOrderStatus(
        Order $order,
        UpdateOrderStatus $request
    ): JsonResponse {
        // Check if user can update order
        Gate::authorize('update', $order);

        // Get validated data
        $data = $request->validated();

        try {
            DB::transaction(function () use ($order, $data) {
                // TODO: move to rider order controller
                if ($data['status'] === OrderStatus::CANCELLED->value) {
                    $order?->delivery->update([
                        'cancelled_at' => now(),
                    ]);
                }

                if ($data['status'] === OrderStatus::PREPARING->value) {
                    $rider = $order->restaurant->riders()
                        ->where('is_active', true)
                        ->get()
                        ->first(fn ($rider) => ! Delivery::isRiderBusy($rider->id));

                    if (! $rider) {
                        throw new Exception('All active riders are currently busy.');
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
            });

            return response()->json(['message' => 'Order status updated successfully.'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (Throwable $e) {
            return response()->json(['message' => 'Could not update order status.'], 500);
        }
    }
}
