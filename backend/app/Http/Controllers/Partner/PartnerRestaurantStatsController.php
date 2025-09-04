<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Partner\PartnerStatsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class PartnerRestaurantStatsController extends Controller
{
    public function __construct(private PartnerStatsService $partnerStatsService) {}

    /**
     * Get restaurant's dashboard stats.
     */
    public function getRestaurantDashboardStats(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewRestaurantStats', $restaurant);

        try {
            $stats = $this->partnerStatsService->getDashboardStats($restaurant);

            return response()->json($stats, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get dashboard stats.',
            ], 500);
        }
    }
}
