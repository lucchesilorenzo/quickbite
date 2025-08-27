<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Throwable;

class RestaurantOfferController extends Controller
{
    /**
     * Get restaurant offers.
     */
    public function getRestaurantOffers(Restaurant $restaurant): JsonResponse
    {
        try {
            $offers = $restaurant->offers()
                ->orderBy('created_at', 'asc')
                ->paginate(6);

            return response()->json($offers, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get offers.',
            ], 500);
        }
    }
}
