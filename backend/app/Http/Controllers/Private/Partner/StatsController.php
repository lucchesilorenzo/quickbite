<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Enums\Kpi;
use App\Enums\PaymentMethod;
use App\Enums\StatRange;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Stats\GetKpiSummaryRequest;
use App\Http\Requests\Private\Partner\Stats\GetStatsRequest;
use App\Models\Restaurant;
use App\Services\Private\Partner\StatsService;
use Dedoc\Scramble\Attributes\Group;
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
