<?php

declare(strict_types=1);

namespace App\Services\Public;

use App\Models\Restaurant;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class OfferService
{
    private const int PER_PAGE = 6;

    public function getOffers(Restaurant $restaurant): LengthAwarePaginator
    {
        return $restaurant->offers()
            ->orderBy('created_at')
            ->paginate(self::PER_PAGE);
    }
}
