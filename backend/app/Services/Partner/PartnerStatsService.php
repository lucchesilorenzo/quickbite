<?php

declare(strict_types=1);

namespace App\Services\Partner;

use App\Enums\OrderStatus;
use App\Models\Restaurant;

class PartnerStatsService
{
    public function getDashboardStats(Restaurant $restaurant): array
    {
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

        return [
            'earnings_today' => $earningsToday,
            'accepted_orders_count' => $acceptedOrdersCount,
            'rejected_orders_count' => $rejectedOrdersCount,
        ];
    }
}
