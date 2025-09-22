<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Exceptions\Private\Partner\PartnerOfferAlreadyExistsException;
use App\Models\Restaurant;
use App\Models\RestaurantOffer;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PartnerOfferService
{
    private const PER_PAGE = 6;

    public function getOffers(Restaurant $restaurant): LengthAwarePaginator
    {
        return $restaurant->offers()
            ->orderBy('created_at')
            ->paginate(self::PER_PAGE);
    }

    public function createOffer(array $data, Restaurant $restaurant): RestaurantOffer
    {
        // Check if offer already exists
        $doesOfferExist = $restaurant->offers()
            ->where('discount_rate', $data['discount_rate'])
            ->exists();

        if ($doesOfferExist) {
            throw new PartnerOfferAlreadyExistsException;
        }

        // Create offer
        return $restaurant->offers()->create($data);
    }

    public function updateOffer(
        array $data,
        Restaurant $restaurant,
        RestaurantOffer $offer
    ): RestaurantOffer {
        $doesOfferExist = $restaurant->offers()
            ->where('discount_rate', $data['discount_rate'])
            ->whereNot('id', $offer->id)
            ->exists();

        if ($doesOfferExist) {
            throw new PartnerOfferAlreadyExistsException;
        }

        $offer->update($data);

        return $offer;
    }

    public function deleteOffer(RestaurantOffer $offer): void
    {
        $offer->delete();
    }
}
