<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Customer\Cart\CreateOrUpdateCartRequest;
use App\Http\Requests\Private\Customer\Cart\CreateOrUpdateCartsRequest;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Services\Private\Customer\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class CartController extends Controller
{
    public function __construct(
        private readonly CartService $cartService
    ) {}

    /**
     * Get customer's carts.
     */
    public function getCarts(): JsonResponse
    {
        try {
            $carts = $this->cartService->getCarts(
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Carts retrieved successfully.',
                'carts' => CartResource::collection($carts),
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
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
            $cart = $this->cartService->getCart($cart);

            return response()->json([
                'success' => true,
                'message' => 'Cart retrieved successfully.',
                'cart' => new CartResource($cart),
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get cart.',
            ], 500);
        }
    }

    /**
     * Create or update multiple carts for customer.
     */
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

            return response()->json([
                'success' => true,
                'message' => 'Carts merged successfully.',
                'carts' => CartResource::collection($carts),
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not merge carts.',
            ], 500);
        }
    }

    /**
     * Update a customer's cart.
     */
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

            $status = $existingCart ? 200 : 201;

            return response()->json([
                'success' => true,
                'message' => $existingCart ? 'Cart updated successfully.' : 'Cart created successfully.',
                'cart' => new CartResource($cart),
            ], $status);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
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
