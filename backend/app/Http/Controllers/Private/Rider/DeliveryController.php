<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Rider;

use App\Http\Controllers\Controller;
use App\Services\Private\Rider\DeliveryService;
use Illuminate\Http\JsonResponse;
use Throwable;

class DeliveryController extends Controller
{
    public function __construct(
        private readonly DeliveryService $deliveryService
    ) {}

    /**
     * Get deliveries.
     */
    public function getDeliveries(): JsonResponse
    {
        try {
            $deliveries = $this->deliveryService->getDeliveries(
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
}
