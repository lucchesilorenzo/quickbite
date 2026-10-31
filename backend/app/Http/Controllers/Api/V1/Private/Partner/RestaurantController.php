<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Exceptions\Private\Partner\RestaurantApprovalException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\Restaurant\UpdateDeliveryTimesRequest;
use App\Http\Requests\Api\V1\Private\Partner\Restaurant\UpdateFeesRequest;
use App\Http\Requests\Api\V1\Private\Partner\Restaurant\UpdateInfoRequest;
use App\Http\Requests\Api\V1\Private\Partner\Restaurant\UpdateStatusRequest;
use App\Http\Resources\Api\V1\Restaurant\RestaurantResource;
use App\Models\Restaurant;
use App\Services\Private\Partner\RestaurantService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Partner Restaurants')]
class RestaurantController extends Controller
{
    public function __construct(
        private readonly RestaurantService $restaurantService,
    ) {}

    /**
     * Get all restaurants.
     */
    #[Endpoint(
        operationId: 'getPartnerRestaurants',
        title: 'List restaurants',
        description: 'List restaurants owned by the authenticated partner.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Restaurants retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving restaurants.',
    )]
    public function getRestaurants(): JsonResponse
    {
        try {
            $restaurants = $this->restaurantService->getRestaurants(
                auth()->user()
            );

            return RestaurantResource::collection($restaurants)
                ->additional([
                    'success' => true,
                    'message' => 'Restaurants retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurants.',
            ], 500);
        }
    }

    /**
     * Get a restaurant.
     */
    #[Endpoint(
        operationId: 'getPartnerRestaurant',
        title: 'Get restaurant',
        description: 'Get a single restaurant.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Restaurant retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving restaurant.',
    )]
    public function getRestaurant(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('view', $restaurant);

        try {
            $restaurant = $this->restaurantService->getRestaurant($restaurant);

            return RestaurantResource::make($restaurant)
                ->additional([
                    'success' => true,
                    'message' => 'Restaurant retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurant.',
            ], 500);
        }
    }

    /**
     * Update status.
     */
    #[Endpoint(
        operationId: 'updatePartnerRestaurantStatus',
        title: 'Update restaurant status',
        description: 'Update restaurant open/closed status.',
        method: 'PATCH'
    )]
    #[Response(
        status: 200,
        description: 'Restaurant status updated successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating restaurant status.',
    )]
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

            return RestaurantResource::make($restaurant)
                ->additional([
                    'success' => true,
                    'message' => 'Restaurant status updated successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update restaurant status.',
            ], 500);
        }
    }

    /**
     * Update approved status.
     */
    #[Endpoint(
        operationId: 'updatePartnerRestaurantApprovedStatus',
        title: 'Update restaurant approved status',
        description: 'Toggle restaurant approved status.',
        method: 'PATCH'
    )]
    #[Response(
        status: 200,
        description: 'Restaurant approved status updated successfully.',
    )]
    #[Response(
        status: 422,
        description: 'Cannot approve restaurant while it is closed or missing required information.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating restaurant approved status.',
    )]
    public function updateApprovedStatus(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('update', $restaurant);

        try {
            $restaurant = $this->restaurantService->updateApprovedStatus(
                $restaurant
            );

            return RestaurantResource::make($restaurant)
                ->additional([
                    'success' => true,
                    'message' => 'Restaurant approved status updated successfully.',
                ])
                ->response();
        } catch (RestaurantApprovalException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update restaurant approved status.',
            ], 500);
        }
    }

    /**
     * Update fees.
     */
    #[Endpoint(
        operationId: 'updatePartnerRestaurantFees',
        title: 'Update restaurant fees',
        description: 'Update restaurant delivery fees and minimum order amount.',
        method: 'PATCH'
    )]
    #[Response(
        status: 200,
        description: 'Restaurant fees updated successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating restaurant fees.',
    )]
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

            return RestaurantResource::make($restaurant)
                ->additional([
                    'success' => true,
                    'message' => 'Restaurant fees updated successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update restaurant fees.',
            ], 500);
        }
    }

    /**
     * Update delivery times.
     */
    #[Endpoint(
        operationId: 'updatePartnerRestaurantDeliveryTimes',
        title: 'Update restaurant delivery times',
        description: 'Update restaurant delivery time slots.',
        method: 'PATCH'
    )]
    #[Response(
        status: 200,
        description: 'Restaurant delivery times updated successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating restaurant delivery times.',
    )]
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

            return RestaurantResource::make($restaurant)
                ->additional([
                    'success' => true,
                    'message' => 'Restaurant delivery times updated successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update restaurant delivery times.',
            ], 500);
        }
    }

    /**
     * Update info.
     */
    #[Endpoint(
        operationId: 'updatePartnerRestaurantInfo',
        title: 'Update restaurant info',
        description: 'Update restaurant information.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'Restaurant info updated successfully.',
    )]
    #[Response(
        status: 404,
        description: 'Location not found.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating restaurant info.',
    )]
    public function updateInfo(
        UpdateInfoRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('update', $restaurant);

        try {
            $restaurant = $this->restaurantService->updateInfo(
                $request->validated(),
                $restaurant,
            );

            return RestaurantResource::make($restaurant)
                ->additional([
                    'success' => true,
                    'message' => 'Restaurant info updated successfully.',
                ])
                ->response();
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update restaurant info.',
            ], 500);
        }
    }
}
