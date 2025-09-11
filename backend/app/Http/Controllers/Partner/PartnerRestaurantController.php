<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\Restaurant\UpdateRestaurantDeliveryTimesRequest;
use App\Http\Requests\Partner\Restaurant\UpdateRestaurantFeesRequest;
use App\Http\Requests\Partner\Restaurant\UpdateRestaurantInfoRequest;
use App\Http\Requests\Partner\Restaurant\UpdateRestaurantStatusRequest;
use App\Models\Restaurant;
use App\Services\Partner\PartnerRestaurantService;
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
            $user = auth()->user();

            $restaurants = $user->restaurants()->get();

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
        Restaurant $restaurant,
        UpdateRestaurantStatusRequest $request
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        $data = $request->validated();

        try {
            $restaurant->update([
                'force_close' => $data['force_close'],
            ]);

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
        Restaurant $restaurant,
        UpdateRestaurantFeesRequest $request
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        $data = $request->validated();

        try {
            $restaurant->update($data);

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
        Restaurant $restaurant,
        UpdateRestaurantDeliveryTimesRequest $request
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        $data = $request->validated();

        try {
            $restaurant = $this->partnerRestaurantService->updateDeliveryTimes($restaurant, $data);

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
        Restaurant $restaurant,
        UpdateRestaurantInfoRequest $request
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        $data = $request->validated();

        try {
            $logo = $request->hasFile('logo') ? $request->file('logo') : null;
            $cover = $request->hasFile('cover') ? $request->file('cover') : null;

            $restaurant = $this->partnerRestaurantService->updateInfo($restaurant, $logo, $cover, $data);

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
