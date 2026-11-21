<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Enums\Kpi;
use App\Enums\PaymentMethod;
use App\Enums\StatRange;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\Stats\GetKpiSummaryRequest;
use App\Http\Requests\Api\V1\Private\Partner\Stats\GetStatsRequest;
use App\Models\Restaurant;
use App\Services\Private\Partner\StatsService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Partner Stats')]
class StatsController extends Controller
{
    public function __construct(
        private readonly StatsService $statsService
    ) {}

    /**
     * Get all dashboard statistics.
     */
    #[Endpoint(
        operationId: 'getPartnerDashboardStats',
        title: 'Get dashboard stats',
        description: 'Get dashboard statistics for a restaurant.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Dashboard stats retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving dashboard stats.',
    )]
    public function getDashboardStats(
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('viewPartnerStats', $restaurant);

        try {
            $statsData = $this->statsService->getDashboardStats($restaurant);

            return response()->json([
                'success' => true,
                'message' => 'Dashboard stats retrieved successfully.',
                'earnings_today' => $statsData['earnings_today'],
                'pending_orders' => $statsData['pending_orders'],
                'accepted_orders' => $statsData['accepted_orders'],
                'rejected_orders' => $statsData['rejected_orders'],
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get dashboard stats.',
            ], 500);
        }
    }

    /**
     * Get KPI summary.
     */
    #[Endpoint(
        operationId: 'getPartnerKpiSummary',
        title: 'Get KPI summary',
        description: 'Get KPI summary for a restaurant.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'KPI summary retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving KPI summary.',
    )]
    public function getKpiSummary(
        GetKpiSummaryRequest $request,
        Restaurant $restaurant
    ) {
        Gate::authorize('viewPartnerStats', $restaurant);

        try {
            $range = $request->enum('range', StatRange::class);
            $paymentMethod = $request->enum('payment_method', PaymentMethod::class);
            $year = (int) $request->query('year');

            $summaryData = $this->statsService->getKpiSummary(
                $restaurant,
                $range,
                $paymentMethod,
                $year,
            );

            return response()->json([
                'success' => true,
                'message' => 'KPI summary retrieved successfully.',
                'accepted_orders' => $summaryData['accepted_orders'],
                'revenue' => $summaryData['revenue'],
                'rejected_orders' => $summaryData['rejected_orders'],
                'lost_revenue' => $summaryData['lost_revenue'],
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get KPI summary.',
            ], 500);
        }
    }

    /**
     * Get all detailed statistics.
     */
    #[Endpoint(
        operationId: 'getPartnerRestaurantStats',
        title: 'Get detailed stats',
        description: 'Get detailed statistics for a specific KPI.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Stats retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving stats.',
    )]
    public function getStats(
        GetStatsRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('viewPartnerStats', $restaurant);

        try {
            $kpi = $request->enum('kpi', Kpi::class);
            $range = $request->enum('range', StatRange::class);
            $paymentMethod = $request->enum('payment_method', PaymentMethod::class);
            $year = (int) $request->query('year', now()->year);

            $statsData = $this->statsService->getStats(
                $restaurant,
                $kpi,
                $range,
                $paymentMethod,
                $year,
            );

            return response()->json([
                'success' => true,
                'message' => 'Stats retrieved successfully.',
                'stats' => $statsData['stats'],
                'filters' => $statsData['filters'],
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurant stats.',
            ], 500);
        }
    }
}
