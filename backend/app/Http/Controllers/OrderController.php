<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Order\CreateOrderRequest;
use App\Models\Order;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Throwable;

class OrderController extends Controller
{
    /**
     * Get all orders for the authenticated user.
     */
    public function getOrders(): JsonResponse
    {
        try {
            $user = auth()->user();

            $orders = $user->orders()->with(['orderItems', 'restaurant.reviews.customer'])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($orders, 200);
        } catch (Throwable $e) {
            return response()->json(['message' => 'Could not get orders.'], 500);
        }
    }

    /**
     * Get an order for the authenticated user.
     */
    public function getOrder(Order $order): JsonResponse
    {
        try {
            $user = auth()->user();

            if ($order->user_id !== $user->id) {
                return response()->json([
                    'message' => 'You are not authorized to view this order.',
                ], 403);
            }

            $order->load(['orderItems', 'restaurant.reviews.customer']);

            return response()->json($order, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get order.',
            ], 500);
        }
    }

    /**
     * Create a new order.
     */
    public function createOrder(CreateOrderRequest $request): JsonResponse
    {
        // Get validated data
        $data = $request->validated();

        try {
            // Get user
            $user = auth()->user();

            // Get restaurant
            $restaurant = Restaurant::find($data['restaurant_id']);

            if (! $restaurant) {
                return response()->json(['message' => 'Could not find the restaurant.'], 404);
            }

            if (! $restaurant->isOpen() || $data['subtotal'] < $restaurant->min_amount) {
                return response()->json([
                    'message' => 'The restaurant is not open or the subtotal is less than the minimum amount.',
                ], 400);
            }

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'restaurant_id' => $data['restaurant_id'],
                'order_code' => $this->generateOrderCode(),
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'phone_number' => $data['phone_number'],
                'street_address' => $data['street_address'],
                'building_number' => $data['building_number'],
                'postcode' => $data['postcode'],
                'city' => $data['city'],
                'delivery_time' => $data['delivery_time'] === 'asap' ? now()->format('H:i:s') : $data['delivery_time'],
                'notes' => $data['notes'] ?? null,
                'payment_method' => $data['payment_method'],
                'subtotal' => $data['subtotal'],
                'delivery_fee' => $data['delivery_fee'],
                'service_fee' => $data['service_fee'],
                'discount_rate' => $data['discount_rate'],
                'discount' => $data['discount'],
                'total' => $data['total'],
            ]);

            // Create order items
            foreach ($data['order_items'] as $item) {
                $order->orderItems()->create([
                    'menu_item_id' => $item['menu_item_id'],
                    'name' => $item['name'],
                    'quantity' => $item['quantity'],
                    'item_total' => $item['item_total'],
                ]);
            }

            $order->load(['orderItems', 'restaurant.reviews.customer']);

            return response()->json([
                'message' => 'Order created successfully.',
                'order' => $order,
            ], 201);
        } catch (Throwable $e) {
            return response()->json(['message' => 'Error creating order.'], 500);
        }
    }

    /**
     * Generate a random order code.
     */
    private function generateOrderCode(): int
    {
        do {
            $code = random_int(100000, 999999);
        } while (Order::where('order_code', $code)->exists());

        return $code;
    }
}
