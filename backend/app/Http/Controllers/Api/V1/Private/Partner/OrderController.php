<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Exceptions\Private\Partner\NoAvailableRidersException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\Order\GetOrdersRequest;
use App\Http\Requests\Api\V1\Private\Partner\Order\UpdateOrderStatus;
use App\Http\Resources\Api\V1\OrderResource;
use App\Models\Order;
use App\Models\Restaurant;
use App\Services\Private\Partner\OrderService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Partner Orders')]
class OrderController extends Controller
{
    public function __construct(
        private readonly OrderService $orderService
    ) {}

    /**
     * Get all orders.
     */
    #[Endpoint(
        operationId: 'getPartnerOrders',
        title: 'List orders',
        description: 'List orders for a restaurant.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Orders retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving orders.',
    )]
    public function getOrders(
        GetOrdersRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('viewAny', [Order::class, $restaurant]);

        try {
            $orders = $this->orderService->getOrders(
                $request->validated(),
                $restaurant
            );

            return OrderResource::collection($orders)
                ->additional([
                    'success' => true,
                    'message' => 'Orders retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get orders.',
            ], 500);
        }
    }

    /**
     * Update order status.
     */
    #[Endpoint(
        operationId: 'updatePartnerOrderStatus',
        title: 'Update order status',
        description: 'Update the status of an order.',
        method: 'PUT'
    )]
    #[Response(
        status: 200,
        description: 'Order status updated successfully.',
    )]
    #[Response(
        status: 400,
        description: 'No available riders to assign the delivery.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating order status.',
    )]
    public function updateOrderStatus(
        UpdateOrderStatus $request,
        Order $order,
    ): JsonResponse {
        Gate::authorize('update', $order);

        try {
            $order = $this->orderService->updateOrderStatus(
                $request->validated(),
                $order
            );

            return OrderResource::make($order)
                ->additional([
                    'success' => true,
                    'message' => 'Order status updated successfully.',
                ])
                ->response();
        } catch (NoAvailableRidersException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update order status.',
            ], 500);
        }
    }
}
