<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

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

        $pendingOrders = $restaurant->orders()
            ->whereToday('created_at')
            ->where('status', OrderStatus::PENDING->value)
            ->count();

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
            'pending_orders' => $pendingOrders,
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
        [$ordersQuery] = $this->buildOrdersQuery($restaurant, $range, $paymentMethod, $year);

        return [
            'accepted_orders' => (clone $ordersQuery)
                ->where('status', OrderStatus::ACCEPTED->value)
                ->count(),
            'revenue' => (float) (clone $ordersQuery)
                ->where('status', OrderStatus::DELIVERED->value)
                ->sum('total'),
            'rejected_orders' => (clone $ordersQuery)
                ->where('status', OrderStatus::REJECTED->value)
                ->count(),
            'lost_revenue' => (float) (clone $ordersQuery)
                ->where('status', OrderStatus::REJECTED->value)
                ->sum('total'),
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
     *         value: float,
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
        [$ordersQuery, $rangeValue] = $this->buildOrdersQuery(
            $restaurant,
            $range,
            $paymentMethod,
            $year
        );

        [$ordersPerPeriod, $dateFormat] = $this->getOrdersPerPeriodGroupedByStatus(
            $ordersQuery,
            $rangeValue,
            OrderStatus::ACCEPTED
        );

        $acceptedOrdersStats = $ordersPerPeriod->map(
            fn ($order): array => [
                'period' => Carbon::parse($order->period)->format($dateFormat),
                'value' => (float) $order->value,
                'total' => $order->total,
                'year' => $year,
            ]
        );

        return [
            'stats' => $acceptedOrdersStats,
            'filters' => [
                'years' => $this->calculateYearsByOrderStatus($restaurant, OrderStatus::ACCEPTED),
            ],
        ];
    }

    /**
     * @return array{
     *     stats: Collection<int, array{
     *         period: string,
     *         value: float,
     *         total: int,
     *         year: int
     *     }>,
     *     filters: array{
     *         years: list<int>
     *     }
     * }
     */
    private function getRevenue(
        Restaurant $restaurant,
        ?StatRange $range,
        int $year
    ): array {
        [$ordersQuery, $rangeValue] = $this->buildOrdersQuery(
            $restaurant,
            $range,
            null,
            $year
        );

        [$ordersPerPeriod, $dateFormat] = $this->getOrdersPerPeriodGroupedByStatus(
            $ordersQuery,
            $rangeValue,
            OrderStatus::DELIVERED,
            true
        );

        $revenueStats = $ordersPerPeriod->map(
            fn ($order): array => [
                'period' => Carbon::parse($order->period)->format($dateFormat),
                'value' => (float) $order->value,
                'total' => $order->total,
                'year' => $year,
            ]
        );

        return [
            'stats' => $revenueStats,
            'filters' => [
                'years' => $this->calculateYearsByOrderStatus($restaurant, OrderStatus::DELIVERED),
            ],
        ];
    }

    /**
     * @return array{
     *     stats: Collection<int, array{
     *         period: string,
     *         value: float,
     *         total: int,
     *         year: int
     *     }>,
     *     filters: array{
     *         years: list<int>
     *     }
     * }
     */
    private function getRejectedOrders(
        Restaurant $restaurant,
        ?StatRange $range,
        int $year
    ): array {
        [$ordersQuery, $rangeValue] = $this->buildOrdersQuery(
            $restaurant,
            $range,
            null,
            $year
        );

        [$ordersPerPeriod, $dateFormat] = $this->getOrdersPerPeriodGroupedByStatus(
            $ordersQuery,
            $rangeValue,
            OrderStatus::REJECTED
        );

        $revenueStats = $ordersPerPeriod->map(
            fn ($order): array => [
                'period' => Carbon::parse($order->period)->format($dateFormat),
                'value' => (float) $order->value,
                'total' => $order->total,
                'year' => $year,
            ]
        );

        return [
            'stats' => $revenueStats,
            'filters' => [
                'years' => $this->calculateYearsByOrderStatus($restaurant, OrderStatus::REJECTED),
            ],
        ];
    }

    /**
     * @return array{
     *     stats: Collection<int, array{
     *         period: string,
     *         value: float,
     *         total: int,
     *         year: int
     *     }>,
     *     filters: array{
     *         years: list<int>
     *     }
     * }
     */
    private function getLostRevenue(
        Restaurant $restaurant,
        ?StatRange $range,
        int $year
    ): array {
        [$ordersQuery, $rangeValue] = $this->buildOrdersQuery(
            $restaurant,
            $range,
            null,
            $year
        );

        [$ordersPerPeriod, $dateFormat] = $this->getOrdersPerPeriodGroupedByStatus(
            $ordersQuery,
            $rangeValue,
            OrderStatus::REJECTED,
            true
        );

        $revenueStats = $ordersPerPeriod->map(
            fn ($order): array => [
                'period' => Carbon::parse($order->period)->format($dateFormat),
                'value' => (float) $order->value,
                'total' => $order->total,
                'year' => $year,
            ]
        );

        return [
            'stats' => $revenueStats,
            'filters' => [
                'years' => $this->calculateYearsByOrderStatus($restaurant, OrderStatus::REJECTED),
            ],
        ];
    }

    private function buildOrdersQuery(
        Restaurant $restaurant,
        ?StatRange $range,
        ?PaymentMethod $paymentMethod,
        ?int $year
    ): array {
        $rangeValue = $range?->value !== null ? (int) str_replace('d', '', $range->value) : null;

        $ordersQuery = $restaurant->orders()
            ->getQuery()
            ->when($rangeValue, fn ($q) => $q->whereBetween('created_at', [now()->subDays($rangeValue), now()]))
            ->when($paymentMethod, fn ($q) => $q->where('payment_method', $paymentMethod->value))
            ->when($year, fn ($q) => $q->whereYear('created_at', $year));

        return [$ordersQuery, $rangeValue];
    }

    private function getOrdersPerPeriodGroupedByStatus(
        Builder $ordersQuery,
        ?int $rangeValue,
        OrderStatus $orderStatus,
        bool $sumTotal = false
    ): array {
        $periodFormat = $rangeValue !== null ? 'DATE(created_at)' : "DATE_TRUNC('month', created_at)";
        $dateFormat = $rangeValue !== null ? 'd M' : 'M';

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
            ->map(fn ($date): int => (int) $date->format('Y'))
            ->unique()
            ->sortDesc()
            ->values()
            ->toArray();
    }
}
