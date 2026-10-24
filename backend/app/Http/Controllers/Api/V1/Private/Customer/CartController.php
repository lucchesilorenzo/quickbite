<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Customer\Cart\CreateOrUpdateCartRequest;
use App\Http\Requests\Api\V1\Private\Customer\Cart\CreateOrUpdateCartsRequest;
use App\Http\Resources\Api\V1\CartResource;
use App\Models\Cart;
use App\Services\Private\Customer\CartService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\PathParameter;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Customer Carts')]
class CartController extends Controller
{
    public function __construct(
        private readonly CartService $cartService
    ) {}

    #[Endpoint(
        operationId: 'getCustomerCarts',
        title: 'List carts',
        description: 'List all active carts for the authenticated customer, grouped by restaurant.',
        method: 'GET'
    )]
    #[Response(status: 200, description: 'Carts retrieved successfully.')]
    #[Response(status: 500, description: 'An unexpected error occurred while retrieving carts.')]
    public function getCarts(): JsonResponse
    {
        try {
            $carts = $this->cartService->getCarts(
                auth()->user()
            );

            return CartResource::collection($carts)
                ->additional([
                    'success' => true,
                    'message' => 'Carts retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get carts.',
            ], 500);
        }
    }

    #[Endpoint(
        operationId: 'getCustomerCart',
        title: 'Get cart',
        description: 'Get a single cart for the authenticated customer.',
        method: 'GET'
    )]
    #[PathParameter(
        name: 'cart',
        description: 'Cart ID.',
        required: true,
        example: 1
    )]
    #[Response(status: 200, description: 'Cart retrieved successfully.')]
    #[Response(status: 404, description: 'Cart not found.')]
    #[Response(status: 500, description: 'An unexpected error occurred while retrieving the cart.')]
    public function getCart(Cart $cart): JsonResponse
    {
        Gate::authorize('view', $cart);

        try {
            $cart = $this->cartService->getCart($cart);

            return CartResource::make($cart)
                ->additional([
                    'success' => true,
                    'message' => 'Cart retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get cart.',
            ], 500);
        }
    }

    #[Endpoint(
        operationId: 'createOrUpdateCustomerCarts',
        title: 'Merge carts',
        description: 'Create or update multiple carts for the authenticated customer (one cart per restaurant).',
        method: 'POST'
    )]
    #[Response(status: 200, description: 'Carts merged successfully.')]
    #[Response(status: 500, description: 'An unexpected error occurred while merging carts.')]
    public function createOrUpdateCarts(
        CreateOrUpdateCartsRequest $request
    ): JsonResponse {
        $data = $request->validated();

        try {
            $user = auth()->user();

            foreach ($data as $cart) {
                $existingCart = $user->carts()
                    ->where('restaurant_id', $cart['restaurant']['id'])
                    ->first();

                if ($existingCart) {
                    Gate::authorize('update', $existingCart);
                }
            }

            $carts = $this->cartService->createOrUpdateCarts($user, $data);

            return CartResource::collection($carts)
                ->additional([
                    'success' => true,
                    'message' => 'Carts merged successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not merge carts.',
            ], 500);
        }
    }

    #[Endpoint(
        operationId: 'createOrUpdateCustomerCart',
        title: 'Create or update cart',
        description: <<<'DESC'
        Create or update a cart for the authenticated customer for a single restaurant.
        If the resulting cart has no items, it is deleted and no cart resource is returned.
        DESC,
        method: 'POST'
    )]
    #[Response(status: 200, description: 'Cart updated successfully, or deleted as it contained no items.')]
    #[Response(status: 201, description: 'Cart created successfully.')]
    #[Response(status: 500, description: 'An unexpected error occurred while creating or updating the cart.')]
    public function createOrUpdateCart(
        CreateOrUpdateCartRequest $request
    ): JsonResponse {
        $data = $request->validated();

        try {
            $user = auth()->user();

            $existingCart = $user->carts()
                ->where('restaurant_id', $data['restaurant']['id'])
                ->first();

            if ($existingCart) {
                Gate::authorize('update', $existingCart);
            }

            $cart = $this->cartService->createOrUpdateCart($user, $data);

            if (! $cart instanceof Cart) {
                return response()->json([
                    'success' => true,
                    'message' => 'Cart has been successfully deleted as it contained no items.',
                ], 200);
            }

            if ($existingCart) {
                return CartResource::make($cart)
                    ->additional([
                        'success' => true,
                        'message' => 'Cart updated successfully.',
                    ])
                    ->response()
                    ->setStatusCode(200);
            }

            return CartResource::make($cart)
                ->additional([
                    'success' => true,
                    'message' => 'Cart created successfully.',
                ])
                ->response()
                ->setStatusCode(201);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create or update cart.',
            ], 500);
        }
    }

    #[Endpoint(
        operationId: 'deleteCustomerCart',
        title: 'Delete cart',
        description: 'Delete a cart for the authenticated customer.',
        method: 'DELETE'
    )]
    #[PathParameter(
        name: 'cart',
        description: 'Cart ID.',
        required: true,
        example: 1
    )]
    #[Response(status: 200, description: 'Cart deleted successfully.')]
    #[Response(status: 404, description: 'Cart not found.')]
    #[Response(status: 500, description: 'An unexpected error occurred while deleting the cart.')]
    public function deleteCart(Cart $cart): JsonResponse
    {
        Gate::authorize('delete', $cart);

        try {
            $this->cartService->deleteCart($cart);

            return response()->json([
                'success' => true,
                'message' => 'Cart deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not delete cart.',
            ], 500);
        }
    }
}
