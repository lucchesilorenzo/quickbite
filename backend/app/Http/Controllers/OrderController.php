<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Models\Order;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    /**
     * Get an order for the authenticated user.
     *
     * @param Order $order
     * @return JsonResponse
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

            $order->load('orderItems');

            return response()->json($order, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get order.',
            ], 500);
        }
    }

    /**
     * Create a new order.
     *
     * @param CreateOrderRequest $request
     * @return JsonResponse
     */
    public function createOrder(CreateOrderRequest $request): JsonResponse
    {
        // Get validated data
        $data = $request->validated();

        try {
            // Get user
            $user = auth()->user();

            // Generate random order code
            do {
                $randomOrderCode = random_int(100000, 999999);
            } while (Order::where('order_code', $randomOrderCode)->exists());

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'restaurant_id' => $data['restaurant_id'],
                'order_code' => $randomOrderCode,
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'phone_number' => $data['phone_number'],
                'street_address' => $data['street_address'],
                'building_number' => $data['building_number'],
                'postcode' => $data['postcode'],
                'city' => $data['city'],
                'delivery_time' => $data['delivery_time'] === "asap" ? now()->format('H:i:s') : $data['delivery_time'],
                'notes' => $data['notes'] ?? null,
                'payment_method' => $data['payment_method'],
            ]);

            // Create order items
            foreach ($data['order_items'] as $item) {
                $order->orderItems()->create([
                    'menu_item_id' => $item['menu_item_id'],
                    'quantity' => $item['quantity'],
                    'item_total' => $item['item_total'],
                ]);
            }

            $order->load('orderItems');

            return response()->json([
                'message' => 'Order created successfully.',
                'order' => $order,
            ], 201);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Error creating order.'], 500);
        }
    }
}
