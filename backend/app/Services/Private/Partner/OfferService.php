<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Exceptions\Private\Partner\OfferAlreadyExistsException;
use App\Models\Offer;
use App\Models\Restaurant;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class OfferService
{
    private const int PER_PAGE = 6;

    public function getOffers(Restaurant $restaurant): LengthAwarePaginator
    {
        return $restaurant->offers()
            ->oldest()
            ->paginate(self::PER_PAGE);
    }

    public function createOffer(array $data, Restaurant $restaurant): Offer
    {
        // Check if offer already exists
        $doesOfferExist = $restaurant->offers()
            ->where('discount_rate', $data['discount_rate'])
            ->exists();

        if ($doesOfferExist) {
            throw new OfferAlreadyExistsException;
        }

        // Create offer
        return $restaurant->offers()->create($data);
    }

    public function updateOffer(
        array $data,
        Restaurant $restaurant,
        Offer $offer
    ): Offer {
        $doesOfferExist = $restaurant->offers()
            ->where('discount_rate', $data['discount_rate'])
            ->whereNot('id', $offer->id)
            ->exists();

        if ($doesOfferExist) {
            throw new OfferAlreadyExistsException;
        }

        $offer->update($data);
        $offer->unsetRelation('restaurant');

        return $offer;
    }

    public function deleteOffer(Offer $offer): void
    {
        $offer->delete();
    }
}
