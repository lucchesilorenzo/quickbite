<?php

namespace App\Services\Partner;

use App\Models\Restaurant;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PartnerOrderService
{
	private const PER_PAGE = 5;

	public function getOrders(Restaurant $restaurant): LengthAwarePaginator
	{
		$orders = $restaurant->orders()
			->with(['orderItems', 'restaurant'])
			->orderByDesc('created_at')
			->paginate(self::PER_PAGE);

		return $orders;
	}
}
