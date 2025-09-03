<?php

declare(strict_types=1);

namespace App\Services\Customer;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CustomerOrderService
{
    private const PER_PAGE = 5;

    public function getOrders(User $user): LengthAwarePaginator
    {
        $orders = $user->orders()
            ->with(['orderItems', 'restaurant.reviews.customer'])
            ->orderByDesc('created_at')
            ->paginate(self::PER_PAGE);

        return $orders;
    }
}
