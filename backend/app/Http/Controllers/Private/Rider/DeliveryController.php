<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Rider;

use App\Exceptions\Private\Rider\InvalidDeliveryStatusException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Rider\Delivery\UpdateDeliveryStatusRequest;
use App\Models\Delivery;
use App\Services\Private\Rider\DeliveryService;
use Dedoc\Scramble\Attributes\Group;
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
    public function getDeliveryHistory(): JsonResponse
    {
        Gate::authorize('viewAny', Delivery::class);

        try {
            $deliveries = $this->deliveryService->getDeliveryHistory(
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Deliveries retrieved successfully.',
                'deliveries' => $deliveries,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get deliveries.',
            ], 500);
        }
    }

    /**
     * Update delivery status.
     */
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

            return response()->json([
                'success' => true,
                'message' => 'Delivery updated successfully.',
                'delivery' => $delivery,
            ], 200);
        } catch (InvalidDeliveryStatusException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update delivery.',
            ], 500);
        }
    }
}
