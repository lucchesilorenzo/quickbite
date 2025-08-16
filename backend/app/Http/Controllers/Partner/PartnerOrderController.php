<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\UpdateOrderStatus;
use App\Models\Order;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
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
                ->get();

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
            // TODO: handle order assignment to rider

            $order->update($data);

            return response()->json(['message' => 'Order status updated successfully.'], 200);
        } catch (Throwable $e) {
            return response()->json(['message' => 'Could not update order status.'], 500);
        }
    }
}
