<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Enums\Kpi;
use App\Enums\PaymentMethod;
use App\Enums\StatRange;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Stats\GetRestaurantKpiSummaryRequest;
use App\Http\Requests\Private\Partner\Stats\GetRestaurantStatsRequest;
use App\Models\Restaurant;
use App\Services\Private\Partner\PartnerStatsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class StatsController extends Controller
{
    public function __construct(
        private readonly PartnerStatsService $partnerStatsService
    ) {}

    /**
     * Get restaurant's dashboard stats.
     */
    public function getDashboardStats(
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('viewPartnerStats', $restaurant);

        try {
            $stats = $this->partnerStatsService->getDashboardStats($restaurant);

            return response()->json($stats, 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get dashboard stats.',
            ], 500);
        }
    }

    public function getKpiSummary(
        GetRestaurantKpiSummaryRequest $request,
        Restaurant $restaurant
    ) {
        Gate::authorize('viewPartnerStats', $restaurant);

        try {
            $range = $request->enum('range', StatRange::class);
            $paymentMethod = $request->enum('payment_method', PaymentMethod::class);
            $year = (int) $request->query('year');

            $summary = $this->partnerStatsService->getKpiSummary(
                $restaurant,
                $range,
                $paymentMethod,
                $year,
            );

            return response()->json($summary, 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get KPI summary.',
            ], 500);
        }
    }

    public function getStats(
        GetRestaurantStatsRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('viewPartnerStats', $restaurant);

        try {
            $kpi = $request->enum('kpi', Kpi::class);
            $range = $request->enum('range', StatRange::class);
            $paymentMethod = $request->enum('payment_method', PaymentMethod::class);
            $year = (int) $request->query('year', now()->year);

            $stats = $this->partnerStatsService->getStats(
                $restaurant,
                $kpi,
                $range,
                $paymentMethod,
                $year,
            );

            return response()->json($stats, 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get restaurant stats.',
            ], 500);
        }
    }
}
