<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Rider;

use App\Exceptions\Private\Rider\InvalidDeliveryStatusException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Rider\Delivery\UpdateDeliveryStatusRequest;
use App\Http\Resources\Api\V1\DeliveryResource;
use App\Models\Delivery;
use App\Services\Private\Rider\DeliveryService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Rider Deliveries')]
class DeliveryController extends Controller
{
    public function __construct(
        private readonly DeliveryService $deliveryService
    ) {}

    /**
     * Get deliveries.
     */
    #[Endpoint(
        operationId: 'getRiderDeliveryHistory',
        title: 'List delivery history',
        description: 'List delivery history for the authenticated rider.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Deliveries retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving deliveries.',
    )]
    public function getDeliveryHistory(): JsonResponse
    {
        Gate::authorize('viewAny', Delivery::class);

        try {
            $deliveries = $this->deliveryService->getDeliveryHistory(
                auth()->user()
            );

            return DeliveryResource::collection($deliveries)
                ->additional([
                    'success' => true,
                    'message' => 'Deliveries retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get deliveries.',
            ], 500);
        }
    }

    /**
     * Get active delivery.
     */
    #[Endpoint(
        operationId: 'getRiderActiveDelivery',
        title: 'Get active delivery',
        description: 'Get the active delivery for the authenticated rider.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Active delivery retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving active delivery.',
    )]
    public function getActiveDelivery(): JsonResponse
    {
        Gate::authorize('viewAny', Delivery::class);

        try {
            $activeDelivery = $this->deliveryService->getActiveDelivery(
                auth()->user()
            );

            return DeliveryResource::make($activeDelivery)
                ->additional([
                    'success' => true,
                    'message' => 'Active delivery retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get active delivery.',
            ], 500);
        }
    }

    /**
     * Update delivery status.
     */
    #[Endpoint(
        operationId: 'updateRiderDeliveryStatus',
        title: 'Update delivery status',
        description: 'Update the status of a delivery.',
        method: 'PUT'
    )]
    #[Response(
        status: 200,
        description: 'Delivery updated successfully.',
    )]
    #[Response(
        status: 400,
        description: 'Invalid delivery status transition.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating delivery.',
    )]
    public function updateDeliveryStatus(
        UpdateDeliveryStatusRequest $request,
        Delivery $delivery
    ): JsonResponse {
        Gate::authorize('update', [Delivery::class, $delivery]);

        try {
            $delivery = $this->deliveryService->updateDeliveryStatus(
                $request->validated(),
                $delivery,
            );

            return DeliveryResource::make($delivery)
                ->additional([
                    'success' => true,
                    'message' => 'Delivery updated successfully.',
                ])
                ->response();
        } catch (InvalidDeliveryStatusException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update delivery.',
            ], 500);
        }
    }
}
