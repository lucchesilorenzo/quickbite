<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\UpdateRestaurantDeliveryTimesRequest;
use App\Http\Requests\Partner\UpdateRestaurantFeesRequest;
use App\Http\Requests\Partner\UpdateRestaurantInfoRequest;
use App\Http\Requests\Partner\UpdateRestaurantStatusRequest;
use App\Models\Restaurant;
use App\Services\LocationService;
use App\Services\Partner\PartnerRestaurantService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Throwable;

class PartnerRestaurantController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        private PartnerRestaurantService $restaurantService,
        private LocationService $locationService
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
            $restaurant = $this->restaurantService->getRestaurant($restaurant);

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
        // Check if user is authorized
        Gate::authorize('update', $restaurant);

        // Get validated data
        $data = $request->validated();

        try {
            $restaurant->update([
                'force_close' => $data['force_close'],
            ]);

            return response()->json([
                'message' => 'Restaurant status updated successfully.',
                'restaurant' => $restaurant,
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
        // Check if user is authorized
        Gate::authorize('update', $restaurant);

        // Get validated data
        $data = $request->validated();

        try {
            $restaurant->update($data);

            return response()->json([
                'message' => 'Restaurant fees updated successfully.',
                'restaurant' => $restaurant,
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
        // Check if user is authorized
        Gate::authorize('update', $restaurant);

        // Get validated data
        $data = $request->validated();

        try {
            // Update delivery days
            foreach ($data['delivery_days'] as $deliveryDay) {
                $restaurant->deliveryDays()
                    ->where('day', $deliveryDay['day'])
                    ->update([
                        'start_time' => $deliveryDay['start_time'],
                        'end_time' => $deliveryDay['end_time'],
                    ]);
            }

            return response()->json([
                'message' => 'Restaurant delivery times updated successfully.',
                'restaurant' => $restaurant,
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
        // Check if user is authorized
        Gate::authorize('update', $restaurant);

        // Get validated data
        $data = $request->validated();

        try {
            if ($request->hasFile('logo')) {
                if ($restaurant->logo && ! str_contains($restaurant->image, 'logos/default')) {
                    $oldLogoPath = str_replace('/storage/', '', $restaurant->logo);

                    if (Storage::disk('public')->exists($oldLogoPath)) {
                        Storage::disk('public')->delete($oldLogoPath);
                    }
                }

                $path = $request->file('logo')->store('restaurants/logos', 'public');
                $data['logo'] = '/storage/' . $path;
            }

            if ($request->hasFile('cover')) {
                if ($restaurant->cover && ! str_contains($restaurant->image, 'covers/default')) {
                    $oldCoverPath = str_replace('/storage/', '', $restaurant->cover);

                    if (Storage::disk('public')->exists($oldCoverPath)) {
                        Storage::disk('public')->delete($oldCoverPath);
                    }
                }

                $path = $request->file('cover')->store('restaurants/covers', 'public');
                $data['cover'] = '/storage/' . $path;
            }

            // Get location
            $locationData = $this->locationService->getLocationData($data);

            if (! $locationData) {
                throw new Exception('Location not found.');
            }

            // Update restaurant info
            $restaurant->update([
                ...$data,
                'latitude' => $locationData['lat'],
                'longitude' => $locationData['lon'],
            ]);

            // Create or update restaurant categories
            $restaurant->categories()->sync($data['categories']);

            return response()->json([
                'message' => 'Restaurant info updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (Throwable $e) {
            if ($e->getMessage() === 'Location not found.') {
                return response()->json([
                    'message' => $e->getMessage(),
                ], 404);
            }

            return response()->json([
                'message' => 'Could not update restaurant info.',
            ], 500);
        }
    }
}
