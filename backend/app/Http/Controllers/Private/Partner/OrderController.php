<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Exceptions\Private\Partner\PartnerNoAvailableRidersException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Order\GetOrdersRequest;
use App\Http\Requests\Private\Partner\Order\UpdateOrderStatus;
use App\Models\Order;
use App\Models\Restaurant;
use App\Services\Private\Partner\PartnerOrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class OrderController extends Controller
{
    public function __construct(
        private readonly PartnerOrderService $partnerOrderService
    ) {}

    /**
     * Get restaurant's orders.
     */
    public function getOrders(
        GetOrdersRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('viewPartnerOrders', $restaurant);

        try {
            $orders = $this->partnerOrderService->getOrders(
                $request->validated(),
                $restaurant
            );

            return response()->json($orders, 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get orders.',
            ], 500);
        }
    }

    /**
     * Update order status.
     */
    public function updateOrderStatus(
        UpdateOrderStatus $request,
        Order $order,
    ): JsonResponse {
        Gate::authorize('updatePartnerOrder', $order);

        try {
            $order = $this->partnerOrderService->updateOrderStatus(
                $request->validated(),
                $order
            );

            return response()->json([
                'order' => $order,
                'message' => 'Order status updated successfully.',
            ], 200);
        } catch (PartnerNoAvailableRidersException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not update order status.',
            ], 500);
        }
    }
}
