<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Customer\Order\CustomerCreateOrderRequest;
use App\Models\Order;
use App\Services\Private\Customer\CustomerOrderService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class CustomerOrderController extends Controller
{
    public function __construct(
        private CustomerOrderService $customerOrderService
    ) {}

    /**
     * Get all customer's orders.
     */
    public function getOrders(): JsonResponse
    {
        try {
            $user = auth()->user();

            $orders = $this->customerOrderService->getOrders($user);

            return response()->json($orders, 200);
        } catch (Throwable $e) {
            return response()->json([
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
            $order = $this->customerOrderService->getOrder($order);

            return response()->json($order, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get order.',
            ], 500);
        }
    }

    /**
     * Create a new customer's order.
     */
    public function createOrder(CustomerCreateOrderRequest $request): JsonResponse
    {
        $data = $request->validated();

        try {
            $user = auth()->user();

            $order = $this->customerOrderService->createOrder($user, $data);

            return response()->json([
                'order' => $order,
                'message' => 'Order created successfully.',
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not create order.',
            ], 500);
        }
    }
}
