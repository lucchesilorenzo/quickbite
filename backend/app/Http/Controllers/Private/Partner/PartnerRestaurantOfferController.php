<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Exceptions\Private\Partner\PartnerOfferAlreadyExistsException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Offer\CreateRestaurantOfferRequest;
use App\Http\Requests\Private\Partner\Offer\UpdateRestaurantOfferRequest;
use App\Models\Restaurant;
use App\Models\RestaurantOffer;
use App\Services\Private\Partner\PartnerOfferService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class PartnerRestaurantOfferController extends Controller
{
    public function __construct(
        private readonly PartnerOfferService $partnerOfferService
    ) {}

    /**
     * Get a partner's restaurant offers.
     */
    public function getRestaurantOffers(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewPartnerRestaurant', $restaurant);

        try {
            $offers = $this->partnerOfferService->getOffers($restaurant);

            return response()->json($offers, 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get offers.',
            ], 500);
        }
    }

    /**
     * Create a partner's restaurant offer.
     */
    public function createRestaurantOffer(
        CreateRestaurantOfferRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('createOffer', $restaurant);

        try {
            $offer = $this->partnerOfferService->createOffer(
                $request->validated(),
                $restaurant,
            );

            return response()->json([
                'offer' => $offer,
                'message' => 'Offer created successfully.',
            ], 201);
        } catch (PartnerOfferAlreadyExistsException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not create offer.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant offer.
     */
    public function updateRestaurantOffer(
        UpdateRestaurantOfferRequest $request,
        Restaurant $restaurant,
        RestaurantOffer $offer
    ): JsonResponse {
        Gate::authorize('update', $offer);

        try {
            $offer = $this->partnerOfferService->updateOffer(
                $request->validated(),
                $restaurant,
                $offer
            );

            return response()->json([
                'offer' => $offer,
                'message' => 'Offer updated successfully.',
            ], 200);
        } catch (PartnerOfferAlreadyExistsException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not update offer.',
            ], 500);
        }
    }

    /**
     * Delete a partner's restaurant offer.
     */
    public function deleteRestaurantOffer(RestaurantOffer $offer): JsonResponse
    {
        Gate::authorize('delete', $offer);

        try {
            $this->partnerOfferService->deleteOffer($offer);

            return response()->json([
                'message' => 'Offer deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not delete offer.',
            ], 500);
        }
    }
}
