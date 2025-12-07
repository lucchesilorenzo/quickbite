<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Exceptions\Private\Partner\OfferAlreadyExistsException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Offer\CreateOfferRequest;
use App\Http\Requests\Private\Partner\Offer\UpdateOfferRequest;
use App\Models\Offer;
use App\Models\Restaurant;
use App\Services\Private\Partner\OfferService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class OfferController extends Controller
{
    public function __construct(
        private readonly OfferService $offerService
    ) {}

    /**
     * Get a partner's offers.
     */
    public function getOffers(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewPartnerRestaurant', $restaurant);

        try {
            $offers = $this->offerService->getOffers($restaurant);

            return response()->json($offers, 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get offers.',
            ], 500);
        }
    }

    /**
     * Create a partner's offer.
     */
    public function createOffer(
        CreateOfferRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('createPartnerOffer', $restaurant);

        try {
            $offer = $this->offerService->createOffer(
                $request->validated(),
                $restaurant,
            );

            return response()->json([
                'success' => true,
                'message' => 'Offer created successfully.',
                'offer' => $offer,
            ], 201);
        } catch (OfferAlreadyExistsException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create offer.',
            ], 500);
        }
    }

    /**
     * Update a partner's offer.
     */
    public function updateOffer(
        UpdateOfferRequest $request,
        Restaurant $restaurant,
        Offer $offer
    ): JsonResponse {
        Gate::authorize('update', $offer);

        try {
            $offer = $this->offerService->updateOffer(
                $request->validated(),
                $restaurant,
                $offer
            );

            return response()->json([
                'success' => true,
                'message' => 'Offer updated successfully.',
                'offer' => $offer,
            ], 200);
        } catch (OfferAlreadyExistsException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update offer.',
            ], 500);
        }
    }

    /**
     * Delete a partner's offer.
     */
    public function deleteOffer(Offer $offer): JsonResponse
    {
        Gate::authorize('delete', $offer);

        try {
            $this->offerService->deleteOffer($offer);

            return response()->json([
                'success' => true,
                'message' => 'Offer deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not delete offer.',
            ], 500);
        }
    }
}
