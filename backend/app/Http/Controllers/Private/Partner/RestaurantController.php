<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Exceptions\Private\Partner\RestaurantApprovalException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Restaurant\UpdateDeliveryTimesRequest;
use App\Http\Requests\Private\Partner\Restaurant\UpdateFeesRequest;
use App\Http\Requests\Private\Partner\Restaurant\UpdateInfoRequest;
use App\Http\Requests\Private\Partner\Restaurant\UpdateStatusRequest;
use App\Models\Restaurant;
use App\Services\Private\Partner\RestaurantService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class RestaurantController extends Controller
{
    public function __construct(
        private readonly RestaurantService $restaurantService,
    ) {}

    /**
     * Get partner's restaurants.
     */
    public function getRestaurants(): JsonResponse
    {
        try {
            $restaurants = $this->restaurantService->getRestaurants(
                auth()->user()
            );

            return response()->json($restaurants, 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
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
            $restaurant = $this->restaurantService->getRestaurant($restaurant);

            return response()->json($restaurant, 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurant.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant status.
     */
    public function updateStatus(
        UpdateStatusRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        try {
            $restaurant = $this->restaurantService->updateStatus(
                $request->validated(),
                $restaurant
            );

            return response()->json([
                'success' => true,
                'message' => 'Restaurant status updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update restaurant status.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant approved status.
     */
    public function updateApprovedStatus(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('update', $restaurant);

        try {
            $restaurant = $this->restaurantService->updateApprovedStatus(
                $restaurant
            );

            return response()->json([
                'success' => true,
                'message' => 'Restaurant approved status updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (RestaurantApprovalException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update restaurant approved status.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant fees.
     */
    public function updateFees(
        UpdateFeesRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        try {
            $restaurant = $this->restaurantService->updateFees(
                $request->validated(),
                $restaurant
            );

            return response()->json([
                'success' => true,
                'message' => 'Restaurant fees updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update restaurant fees.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant delivery times.
     */
    public function updateDeliveryTimes(
        UpdateDeliveryTimesRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        try {
            $restaurant = $this->restaurantService->updateDeliveryTimes(
                $request->validated(),
                $restaurant
            );

            return response()->json([
                'success' => true,
                'message' => 'Restaurant delivery times updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update restaurant delivery times.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant info.
     */
    public function updateInfo(
        UpdateInfoRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        try {
            $logo = $request->hasFile('logo') ? $request->file('logo') : null;
            $cover = $request->hasFile('cover') ? $request->file('cover') : null;

            $restaurant = $this->restaurantService->updateInfo(
                $request->validated(),
                $restaurant,
                $logo,
                $cover
            );

            return response()->json([
                'success' => true,
                'message' => 'Restaurant info updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update restaurant info.',
            ], 500);
        }
    }
}
