<?php

declare(strict_types=1);

namespace App\Services\Partner;

use App\Enums\Kpi;
use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\StatRange;
use App\Models\Restaurant;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class PartnerStatsService
{
    public function getDashboardStats(Restaurant $restaurant): array
    {
        $earningsToday = $restaurant->orders()
            ->whereToday('created_at')
            ->where('status', OrderStatus::DELIVERED->value)
            ->sum('total');

        $acceptedOrders = $restaurant->orders()
            ->whereToday('created_at')
            ->where('status', OrderStatus::ACCEPTED->value)
            ->count();

        $rejectedOrders = $restaurant->orders()
            ->whereToday('created_at')
            ->where('status', OrderStatus::REJECTED->value)
            ->count();

        return [
            'earnings_today' => $earningsToday,
            'accepted_orders' => $acceptedOrders,
            'rejected_orders' => $rejectedOrders,
        ];
    }

    public function getKpiSummary(
        Restaurant $restaurant,
        ?StatRange $range,
        ?PaymentMethod $paymentMethod,
        ?int $year
    ): array {
        [$query] = $this->buildOrdersQuery($restaurant, $range, $paymentMethod, $year);

        return [
            'accepted_orders' => (clone $query)->where('status', OrderStatus::ACCEPTED->value)->count(),
            'revenue' => (clone $query)->where('status', OrderStatus::DELIVERED->value)->sum('total'),
            'rejected_orders' => (clone $query)->where('status', OrderStatus::REJECTED->value)->count(),
            'lost_revenue' => (clone $query)->where('status', OrderStatus::REJECTED->value)->sum('total'),
        ];
    }

    public function getStats(
        Restaurant $restaurant,
        Kpi $kpi,
        ?StatRange $range,
        ?PaymentMethod $paymentMethod,
        int $year,
    ): array {
        return match ($kpi) {
            Kpi::ACCEPTED_ORDERS => $this->getAcceptedOrders($restaurant, $range, $paymentMethod, $year),
            Kpi::REVENUE => $this->getRevenue($restaurant, $range, $year),
            Kpi::REJECTED_ORDERS => $this->getRejectedOrders($restaurant, $range, $year),
            Kpi::LOST_REVENUE => $this->getLostRevenue($restaurant, $range, $year),
        };
    }

    /**
     * @return array{
     *     stats: Collection<int, array{
     *         period: string,
     *         accepted: int,
     *         total: int,
     *         year: int
     *     }>,
     *     filters: array{
     *         years: list<int>
     *     }
     * }
     */
    private function getAcceptedOrders(
        Restaurant $restaurant,
        ?StatRange $range,
        ?PaymentMethod $paymentMethod,
        int $year
    ): array {
        [$query, $rangeValue] = $this->buildOrdersQuery($restaurant, $range, $paymentMethod, $year);

        $periodFormat = $rangeValue ? 'DATE(created_at)' : "DATE_TRUNC('month', created_at)";
        $dateFormat = $rangeValue ? 'd M' : 'M';

        /** @var Collection<int, object{period: string, total: int, accepted: int}> */
        $rawResults = $query
            ->selectRaw("{$periodFormat} as period")
            ->selectRaw('COUNT(*) as total')
            ->selectRaw('COUNT(*) FILTER (WHERE status = ?) as accepted', [OrderStatus::ACCEPTED->value])
            ->groupBy('period')
            ->havingRaw('COUNT(*) FILTER (WHERE status = ?) > 0', [OrderStatus::ACCEPTED->value])
            ->orderBy('period')
            ->get();

        $acceptedOrdersStats = $rawResults->map(
            fn ($order) => [
                'period' => Carbon::parse($order->period)->format($dateFormat),
                'accepted' => $order->accepted,
                'total' => $order->total,
                'year' => $year,
            ]
        );

        return [
            'stats' => $acceptedOrdersStats,
            'filters' => [
                'years' => $this->calculateYearsPerOrderStatus($restaurant, OrderStatus::ACCEPTED),
            ],
        ];
    }

    private function getRevenue(Restaurant $restaurant, ?StatRange $range, int $year)
    {
        // TODO
    }

    private function getRejectedOrders(Restaurant $restaurant, ?StatRange $range, int $year)
    {
        // TODO
    }

    private function getLostRevenue(Restaurant $restaurant, ?StatRange $range, int $year)
    {
        // TODO
    }

    private function buildOrdersQuery(
        Restaurant $restaurant,
        ?StatRange $range,
        ?PaymentMethod $paymentMethod,
        ?int $year
    ): array {
        $rangeValue = isset($range->value) ? (int) str_replace('d', '', $range->value) : null;

        $query = $restaurant->orders()
            ->when($rangeValue, fn ($q) => $q->whereBetween('created_at', [now()->subDays($rangeValue), now()]))
            ->when($paymentMethod, fn ($q) => $q->where('payment_method', $paymentMethod->value))
            ->when($year, fn ($q) => $q->whereYear('created_at', $year));

        return [$query, $rangeValue];
    }

    private function getOrdersPerPeriodGroupedByStatus(
        Builder $ordersQuery,
        ?int $rangeValue,
        OrderStatus $orderStatus,
        bool $sumTotal = false
    ): array {
        $periodFormat = $rangeValue ? 'DATE(created_at)' : "DATE_TRUNC('month', created_at)";
        $dateFormat = $rangeValue ? 'd M' : 'M';

        $kpiSelect = $sumTotal
            ? 'SUM(total) FILTER (WHERE status = ?) as value'
            : 'COUNT(*) FILTER (WHERE status = ?) as value';

        $havingRawCondition = $sumTotal ? 'SUM(total)' : 'COUNT(*)';

        /** @var Collection<int, object{period: string, value: string, total: int}> */
        $ordersPerPeriod = $ordersQuery
            ->selectRaw("{$periodFormat} as period")
            ->selectRaw('COUNT(*) as total')
            ->selectRaw($kpiSelect, [$orderStatus->value])
            ->groupBy('period')
            ->havingRaw("{$havingRawCondition} FILTER (WHERE status = ?) > 0", [$orderStatus->value])
            ->orderBy('period')
            ->get();

        return [$ordersPerPeriod, $dateFormat];
    }

    private function calculateYearsByOrderStatus(
        Restaurant $restaurant,
        OrderStatus $orderStatus,
    ): array {
        return $restaurant->orders()
            ->where('status', $orderStatus->value)
            ->pluck('created_at')
            ->map(fn ($date) => (int) $date->format('Y'))
            ->unique()
            ->sortDesc()
            ->values()
            ->toArray();
    }
}
