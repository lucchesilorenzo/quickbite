<?php

declare(strict_types=1);

namespace App\Services\Partner;

use App\Models\Restaurant;
use App\Models\RestaurantOffer;
use Exception;
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

	public function createOffer(Restaurant $restaurant, array $data): RestaurantOffer
	{
		// Check if offer already exists
		$doesOfferExist = $restaurant->offers()
			->where('discount_rate', $data['discount_rate'])
			->exists();

		if ($doesOfferExist) {
			throw new Exception(
				'An offer with the same discount rate already exists.',
				422
			);
		}

		// Create offer
		$offer = $restaurant->offers()->create($data);

		return $offer;
	}
}
