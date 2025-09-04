<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\CreateRestaurantOfferRequest;
use App\Http\Requests\Partner\UpdateRestaurantOfferRequest;
use App\Models\Restaurant;
use App\Models\RestaurantOffer;
use App\Services\Partner\PartnerOfferService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class PartnerRestaurantOfferController extends Controller
{
    public function __construct(private PartnerOfferService $partnerOfferService) {}

    /**
     * Get a partner's restaurant offers.
     */
    public function getRestaurantOffers(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewPartnerRestaurant', $restaurant);

        try {
            $offers = $this->partnerOfferService->getOffers($restaurant);

            return response()->json($offers, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get offers.',
            ], 500);
        }
    }

    /**
     * Create a partner's restaurant offer.
     */
    public function createRestaurantOffer(
        Restaurant $restaurant,
        CreateRestaurantOfferRequest $request,
    ): JsonResponse {
        Gate::authorize('createOffer', $restaurant);

        $data = $request->validated();

        try {
            $offer = $this->partnerOfferService->createOffer($restaurant, $data);

            return response()->json([
                'offer' => $offer,
                'message' => 'Offer created successfully.',
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not create offer.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant offer.
     */
    public function updateRestaurantOffer(
        Restaurant $restaurant,
        RestaurantOffer $offer,
        UpdateRestaurantOfferRequest $request
    ): JsonResponse {
        Gate::authorize('update', $offer);

        $data = $request->validated();

        try {
            $offer = $this->partnerOfferService->updateOffer($restaurant, $offer, $data);

            return response()->json([
                'offer' => $offer,
                'message' => 'Offer updated successfully.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
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
            $offer->delete();

            return response()->json([
                'message' => 'Offer deleted successfully.',
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not delete offer.',
            ], 500);
        }
    }
}
