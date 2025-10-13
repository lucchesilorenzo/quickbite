<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Public\OfferService;
use Illuminate\Http\JsonResponse;
use Throwable;

class OfferController extends Controller
{
    public function __construct(
        private readonly OfferService $offerService
    ) {}

    /**
     * Get restaurant's offers.
     */
    public function getOffers(Restaurant $restaurant): JsonResponse
    {
        try {
            $offers = $this->offerService->getOffers($restaurant);

            return response()->json($offers, 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get offers.',
            ], 500);
        }
    }
}
