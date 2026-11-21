<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Customer;

use App\Exceptions\Private\Customer\OrderExpiredException;
use App\Exceptions\Private\Customer\RestaurantNotAvailableException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Customer\Order\CreateOrderRequest;
use App\Http\Resources\Api\V1\OrderResource;
use App\Models\Order;
use App\Services\Private\Customer\OrderService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\PathParameter;
use Dedoc\Scramble\Attributes\QueryParameter;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Customer Orders')]
class OrderController extends Controller
{
    public function __construct(
        private readonly OrderService $orderService
    ) {}

    #[Endpoint(
        operationId: 'getCustomerOrders',
        title: 'List orders',
        description: 'List orders for the authenticated customer, ordered by most recent first.',
        method: 'GET'
    )]
    #[QueryParameter(name: 'page', description: 'Page number.', required: false, type: 'integer', example: 1)]
    #[Response(status: 200, description: 'Orders retrieved successfully.')]
    #[Response(status: 500, description: 'An unexpected error occurred while retrieving orders.')]
    public function getOrders(): JsonResponse
    {
        try {
            $orders = $this->orderService->getOrders(
                auth()->user()
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

    #[Endpoint(
        operationId: 'getCustomerOrder',
        title: 'Get order',
        description: 'Get a single order for the authenticated customer.',
        method: 'GET'
    )]
    #[PathParameter(
        name: 'order',
        description: 'Order ID.',
        required: true,
        example: 1
    )]
    #[Response(status: 200, description: 'Order retrieved successfully.')]
    #[Response(status: 404, description: 'Order not found.')]
    #[Response(status: 409, description: 'The order has expired and can no longer be viewed in full detail.')]
    #[Response(status: 500, description: 'An unexpected error occurred while retrieving the order.')]
    public function getOrder(Order $order): JsonResponse
    {
        Gate::authorize('view', $order);

        try {
            $order = $this->orderService->getOrder($order);

            return OrderResource::make($order)
                ->additional([
                    'success' => true,
                    'message' => 'Order retrieved successfully.',
                ])
                ->response();
        } catch (OrderExpiredException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 409);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get order.',
            ], 500);
        }
    }

    #[Endpoint(
        operationId: 'createCustomerOrder',
        title: 'Create order',
        description: <<<'DESC'
        Create an order for the authenticated customer. For online payments, a Stripe PaymentIntent
        is created and its client secret is returned for client-side confirmation.
        DESC,
        method: 'POST'
    )]
    #[Response(status: 201, description: 'Order created successfully.')]
    #[Response(status: 400, description: 'The restaurant is closed or the subtotal is below the minimum order amount.')]
    #[Response(status: 404, description: 'Restaurant not found or delivery location could not be resolved.')]
    #[Response(status: 500, description: 'An unexpected error occurred while creating the order.')]
    public function createOrder(CreateOrderRequest $request): JsonResponse
    {
        try {
            $result = $this->orderService->createOrder(
                auth()->user(),
                $request->validated()
            );

            return OrderResource::make($result['order'])
                ->additional([
                    'stripe_client_secret' => $result['stripe_client_secret'],
                    'success' => true,
                    'message' => 'Order created successfully.',
                ])
                ->response()
                ->setStatusCode(201);
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => 'Restaurant not found.',
            ], 404);
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        } catch (RestaurantNotAvailableException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create order.',
            ], 500);
        }
    }
}
