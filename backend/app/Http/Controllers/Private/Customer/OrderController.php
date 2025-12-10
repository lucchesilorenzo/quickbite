<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Customer;

use App\Exceptions\Private\Customer\RestaurantNotAvailableException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Customer\Order\CreateOrderRequest;
use App\Models\Order;
use App\Services\Private\Customer\OrderService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class OrderController extends Controller
{
    public function __construct(
        private readonly OrderService $orderService
    ) {}

    /**
     * Get all customer's orders.
     */
    public function getOrders(): JsonResponse
    {
        try {
            $orders = $this->orderService->getOrders(
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Orders retrieved successfully.',
                'orders' => $orders,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get orders.',
            ], 500);
        }
    }

    /**
     * Get a customer's order.
     */
    public function getOrder(Order $order): JsonResponse
    {
        Gate::authorize('view', $order);

        try {
            $order = $this->orderService->getOrder($order);

            return response()->json([
                'success' => true,
                'message' => 'Order retrieved successfully.',
                'order' => $order,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get order.',
            ], 500);
        }
    }

    /**
     * Create a new customer's order.
     */
    public function createOrder(CreateOrderRequest $request): JsonResponse
    {
        try {
            $order = $this->orderService->createOrder(
                auth()->user(),
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Order created successfully.',
                'order' => $order,
            ], 201);
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => 'Restaurant not found.',
            ], 404);
        } catch (LocationNotFoundException|RestaurantNotAvailableException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create order.',
            ], 500);
        }
    }
}
