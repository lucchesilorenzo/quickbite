<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\CreateRestaurantOfferRequest;
use App\Http\Requests\Partner\UpdateRestaurantOfferRequest;
use App\Models\Restaurant;
use App\Models\RestaurantOffer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class PartnerRestaurantOfferController extends Controller
{
    /**
     * Get a partner's restaurant offers.
     */
    public function getRestaurantOffers(Restaurant $restaurant): JsonResponse
    {
        // Check if user is authorized
        Gate::authorize('viewPartnerRestaurant', $restaurant);

        try {
            $offers = $restaurant->offers()
                ->orderBy('created_at', 'asc')
                ->get();

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

        // Get validated data
        $data = $request->validated();

        try {
            // Check if offer already exists
            $doesOfferExist = $restaurant->offers()
                ->where('discount_rate', $data['discount_rate'])
                ->exists();

            if ($doesOfferExist) {
                return response()->json([
                    'message' => 'An offer with the same discount rate already exists.',
                ], 422);
            }

            // Create offer
            $offer = $restaurant->offers()->create($data);

            return response()->json([
                'message' => 'Offer created successfully.',
                'offer' => $offer,
            ], 201);
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
        // Check if user is authorized
        Gate::authorize('update', $offer);

        // Get validated data
        $data = $request->validated();

        try {
            // Check if offer already exists
            $doesOfferExist = $restaurant->offers()
                ->where('discount_rate', $data['discount_rate'])
                ->whereNot('id', $offer->id)
                ->exists();

            if ($doesOfferExist) {
                return response()->json([
                    'message' => 'An offer with the same discount rate already exists.',
                ], 422);
            }

            $offer->update($data);

            return response()->json([
                'message' => 'Offer updated successfully.',
                'offer' => $offer,
            ], 200);
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
        // Check if user is authorized
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
