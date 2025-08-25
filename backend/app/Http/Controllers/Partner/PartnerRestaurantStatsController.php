<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class PartnerRestaurantStatsController extends Controller
{
    /**
     * Get restaurant's dashboard stats.
     */
    public function getRestaurantDashboardStats(Restaurant $restaurant): JsonResponse
    {
        // Check if the user has access to the restaurant
        Gate::authorize('viewRestaurantStats', $restaurant);

        try {
            $earningsToday = $restaurant->orders()
                ->whereToday('created_at')
                ->where('status', OrderStatus::DELIVERED->value)
                ->sum('total');

            $acceptedOrdersCount = $restaurant->orders()
                ->whereToday('created_at')
                ->where('status', OrderStatus::ACCEPTED->value)
                ->count();

            $rejectedOrdersCount = $restaurant->orders()
                ->whereToday('created_at')
                ->where('status', OrderStatus::REJECTED->value)
                ->count();

            return response()->json([
                'earnings_today' => $earningsToday,
                'accepted_orders' => $acceptedOrdersCount,
                'rejected_orders' => $rejectedOrdersCount,
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get dashboard stats.',
            ], 500);
        }
    }
}
