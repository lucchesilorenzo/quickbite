<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Customer\Cart\CustomerCreateOrUpdateCartRequest;
use App\Http\Requests\Private\Customer\Cart\CustomerCreateOrUpdateCartsRequest;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Services\Private\Customer\CustomerCartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class CartController extends Controller
{
    public function __construct(
        private readonly CustomerCartService $customerCartService
    ) {}

    /**
     * Get customer's carts.
     */
    public function getCarts(): JsonResponse
    {
        try {
            $carts = $this->customerCartService->getCarts(
                auth()->user()
            );

            return CartResource::collection($carts)
                ->response()
                ->setStatusCode(200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get carts.',
            ], 500);
        }
    }

    /**
     * Get customer's cart.
     */
    public function getCart(Cart $cart): JsonResponse
    {
        Gate::authorize('view', $cart);

        try {
            $cart = $this->customerCartService->getCart($cart);

            return new CartResource($cart)
                ->response()
                ->setStatusCode(200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get cart.',
            ], 500);
        }
    }

    /**
     * Create or update multiple carts for customer.
     */
    public function createOrUpdateCarts(
        CustomerCreateOrUpdateCartsRequest $request
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

            $carts = $this->customerCartService->createOrUpdateCarts($user, $data);

            return CartResource::collection($carts)
                ->additional([
                    'message' => 'Carts merged successfully.',
                ])
                ->response()
                ->setStatusCode(200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not merge carts.',
            ], 500);
        }
    }

    /**
     * Update a customer's cart.
     */
    public function createOrUpdateCart(
        CustomerCreateOrUpdateCartRequest $request
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

            $cart = $this->customerCartService->createOrUpdateCart($user, $data);

            if (! $cart instanceof Cart) {
                return response()->json([
                    'message' => 'Cart has been successfully deleted as it contained no items.',
                ], 200);
            }

            $status = $existingCart ? 200 : 201;

            return new CartResource($cart)
                ->additional([
                    'message' => $existingCart ? 'Cart updated successfully.' : 'Cart created successfully.',
                ])
                ->response()
                ->setStatusCode($status);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not create or update cart.',
            ], 500);
        }
    }

    /**
     * Delete a customer's cart.
     */
    public function deleteCart(Cart $cart): JsonResponse
    {
        Gate::authorize('delete', $cart);

        try {
            $this->customerCartService->deleteCart($cart);

            return response()->json([
                'message' => 'Cart deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not delete cart.',
            ], 500);
        }
    }
}
