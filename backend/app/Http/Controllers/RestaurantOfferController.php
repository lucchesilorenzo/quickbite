<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Services\RestaurantOfferService;
use Illuminate\Http\JsonResponse;
use Throwable;

class RestaurantOfferController extends Controller
{
    public function __construct(private RestaurantOfferService $restaurantOfferService) {}

    /**
     * Get restaurant's offers.
     */
    public function getRestaurantOffers(Restaurant $restaurant): JsonResponse
    {
        try {
            $offers = $this->restaurantOfferService->getOffers($restaurant);

            return response()->json($offers, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get offers.',
            ], 500);
        }
    }
}
