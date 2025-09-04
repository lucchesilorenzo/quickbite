<?php

declare(strict_types=1);

namespace App\Services\Partner;

use App\Models\Restaurant;

class PartnerRestaurantService
{
	public function getRestaurant(Restaurant $restaurant): Restaurant
	{
		return $this->loadRestaurantRelations($restaurant);
	}

	public function updateDeliveryTimes(Restaurant $restaurant, array $data): Restaurant
	{
		foreach ($data['delivery_days'] as $deliveryDay) {
			$restaurant->deliveryDays()
				->where('day', $deliveryDay['day'])
				->update([
					'start_time' => $deliveryDay['start_time'],
					'end_time' => $deliveryDay['end_time'],
				]);
		}

		return $this->loadRestaurantRelations($restaurant);
	}

	private function loadRestaurantRelations(Restaurant $restaurant): Restaurant
	{
		return $restaurant->load([
			'categories',
			'deliveryDays' => fn($query) => $query->orderBy('order'),
		]);
	}
}
