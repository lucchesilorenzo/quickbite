<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Restaurant\UpdateRestaurantDeliveryTimesRequest;
use App\Http\Requests\Private\Partner\Restaurant\UpdateRestaurantFeesRequest;
use App\Http\Requests\Private\Partner\Restaurant\UpdateRestaurantInfoRequest;
use App\Http\Requests\Private\Partner\Restaurant\UpdateRestaurantStatusRequest;
use App\Models\Restaurant;
use App\Services\Private\Partner\PartnerRestaurantService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class PartnerRestaurantController extends Controller
{
    public function __construct(
        private PartnerRestaurantService $partnerRestaurantService,
    ) {}

    /**
     * Get partner's restaurants.
     */
    public function getRestaurants(): JsonResponse
    {
        try {
            $restaurants = $this->partnerRestaurantService->getRestaurants(
                auth()->user()
            );

            return response()->json($restaurants, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurants.',
            ], 500);
        }
    }

    /**
     * Get a partner's restaurant.
     */
    public function getRestaurant(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewPartnerRestaurant', $restaurant);

        try {
            $restaurant = $this->partnerRestaurantService->getRestaurant($restaurant);

            return response()->json($restaurant, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurant.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant status.
     */
    public function updateRestaurantStatus(
        UpdateRestaurantStatusRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        try {
            $restaurant = $this->partnerRestaurantService->updateStatus(
                $request->validated(),
                $restaurant
            );

            return response()->json([
                'restaurant' => $restaurant,
                'message' => 'Restaurant status updated successfully.',
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update restaurant status.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant fees.
     */
    public function updateRestaurantFees(
        UpdateRestaurantFeesRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        try {
            $restaurant = $this->partnerRestaurantService->updateFees(
                $request->validated(),
                $restaurant
            );

            return response()->json([
                'restaurant' => $restaurant,
                'message' => 'Restaurant fees updated successfully.',
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update restaurant fees.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant delivery times.
     */
    public function updateRestaurantDeliveryTimes(
        UpdateRestaurantDeliveryTimesRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        try {
            $restaurant = $this->partnerRestaurantService->updateDeliveryTimes(
                $request->validated(),
                $restaurant
            );

            return response()->json([
                'restaurant' => $restaurant,
                'message' => 'Restaurant delivery times updated successfully.',
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update restaurant delivery times.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant info.
     */
    public function updateRestaurantInfo(
        UpdateRestaurantInfoRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        try {
            $logo = $request->hasFile('logo') ? $request->file('logo') : null;
            $cover = $request->hasFile('cover') ? $request->file('cover') : null;

            $restaurant = $this->partnerRestaurantService->updateInfo(
                $request->validated(),
                $restaurant,
                $logo,
                $cover
            );

            return response()->json([
                'restaurant' => $restaurant,
                'message' => 'Restaurant info updated successfully.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update restaurant info.',
            ], 500);
        }
    }
}
