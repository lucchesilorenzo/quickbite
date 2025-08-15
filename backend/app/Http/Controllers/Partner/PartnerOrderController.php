<?php

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class PartnerOrderController extends Controller
{
    /**
     * Get restaurant's orders.
     */
    public function getOrders(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewRestaurantOrders', $restaurant);

        try {
            $orders = $restaurant->orders()
                ->with(['orderItems', 'restaurant'])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($orders, 200);
        } catch (Throwable $e) {
            return response()->json(['message' => 'Could not get orders.'], 500);
        }
    }
}
