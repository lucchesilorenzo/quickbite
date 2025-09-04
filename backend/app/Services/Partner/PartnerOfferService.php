<?php

declare(strict_types=1);

namespace App\Services\Partner;

use App\Models\Restaurant;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PartnerOfferService
{
    private const PER_PAGE = 6;

    public function getOffers(Restaurant $restaurant): LengthAwarePaginator
    {
        $offers = $restaurant->offers()
            ->orderBy('created_at')
            ->paginate(self::PER_PAGE);

        return $offers;
    }
}
