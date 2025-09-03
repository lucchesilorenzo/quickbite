<?php

declare(strict_types=1);

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\Cart\CustomerCreateOrUpdateCartRequest;
use App\Http\Requests\Customer\Cart\CustomerCreateOrUpdateCartsRequest;
use App\Models\Cart;
use App\Services\Customer\CustomerCartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class CustomerCartController extends Controller
{
    public function __construct(
        private CustomerCartService $customerCartService
    ) {}

    /**
     * Get customer's carts.
     */
    public function getCarts(): JsonResponse
    {
        $user = auth()->user();

        try {
            $carts = $this->customerCartService->getCarts($user);

            return response()->json($carts, 200);
        } catch (Throwable $e) {
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

            return response()->json($cart, 200);
        } catch (Throwable $e) {
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

            return response()->json([
                'message' => 'Carts merged successfully.',
                'carts' => $carts,
            ], 200);
        } catch (Throwable $e) {
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

            if (empty($cart)) {
                return response()->json([
                    'message' => 'Cart has been successfully deleted as it contained no items.',
                ], 200);
            }

            $status = $existingCart ? 200 : 201;

            return response()->json([
                'message' => $existingCart ? 'Cart updated successfully.' : 'Cart created successfully.',
                'cart' => $cart,
            ], $status);
        } catch (Throwable $e) {
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
            $cart->delete();

            return response()->json([
                'message' => 'Cart deleted successfully.',
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not delete cart.',
            ], 500);
        }
    }
}
