<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Order\UpdateOrderStatus;
use App\Models\Order;
use App\Models\Restaurant;
use App\Services\Private\Partner\PartnerOrderService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class PartnerOrderController extends Controller
{
    public function __construct(
        private PartnerOrderService $partnerOrderService
    ) {}

    /**
     * Get restaurant's orders.
     */
    public function getOrders(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewRestaurantOrders', $restaurant);

        try {
            $orders = $this->partnerOrderService->getOrders($restaurant);

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
            $order = $this->partnerOrderService->updateOrderStatus($order, $data);

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
