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
}
