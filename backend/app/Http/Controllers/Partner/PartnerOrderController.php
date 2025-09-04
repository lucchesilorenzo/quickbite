<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\UpdateOrderStatus;
use App\Models\Order;
use App\Models\Restaurant;
use App\Services\Partner\PartnerOrderService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class PartnerOrderController extends Controller
{
    public function __construct(private PartnerOrderService $orderService) {}

    /**
     * Get restaurant's orders.
     */
    public function getOrders(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewRestaurantOrders', $restaurant);

        try {
            $orders = $this->orderService->getOrders($restaurant);

            return response()->json($orders, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get orders.',
            ], 500);
        }
    }

    /**
     * Update order status.
     */
    public function updateOrderStatus(
        Order $order,
        UpdateOrderStatus $request
    ): JsonResponse {
        Gate::authorize('updatePartnerOrder', $order);

        $data = $request->validated();

        try {
            $order = $this->orderService->updateOrderStatus($order, $data);

            return response()->json([
                'order' => $order,
                'message' => 'Order status updated successfully.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update order status.',
            ], 500);
        }
    }
}
