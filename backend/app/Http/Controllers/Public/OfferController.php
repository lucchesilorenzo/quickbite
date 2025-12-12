<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Public\OfferService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Public Offers')]
class OfferController extends Controller
{
    public function __construct(
        private readonly OfferService $offerService
    ) {}

    /**
     * Get all offers.
     */
    public function getOffers(Restaurant $restaurant): JsonResponse
    {
        try {
            $offers = $this->offerService->getOffers($restaurant);

            return response()->json([
                'success' => true,
                'message' => 'Offers retrieved successfully.',
                'offers' => $offers,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get offers.',
            ], 500);
        }
    }
}
