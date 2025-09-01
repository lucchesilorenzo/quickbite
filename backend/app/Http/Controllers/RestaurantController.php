<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Services\RestaurantService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Throwable;

class RestaurantController extends Controller
{
    public function __construct(private RestaurantService $restaurantService) {}

    /**
     * Get restaurants.
     */
    public function getRestaurants(Request $request): JsonResponse
    {
        try {
            $result = $this->restaurantService->getRestaurants($request);

            return response()->json($result, 200);
        } catch (InvalidArgumentException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurants.',
            ], 500);
        }
    }

    /**
     * Get a restaurant.
     */
    public function getRestaurant(string $restaurantSlug): JsonResponse
    {
        try {
            // Get restaurant
            $restaurant = Restaurant::with([
                'categories',
                'deliveryDays' => function ($query) {
                    $query->orderBy('order');
                },
            ])
                ->where('slug', $restaurantSlug)
                ->where('is_approved', true)
                ->first();

            if (! $restaurant) {
                return response()->json([
                    'message' => 'Restaurant not found.',
                ], 404);
            }

            return response()->json($restaurant, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurant.',
            ], 500);
        }
    }

    /**
     * Get a restaurant logo as base64.
     */
    public function getBase64Logo(Restaurant $restaurant): JsonResponse
    {
        try {
            // Remove '/storage/' prefix from path
            $relativePath = str_replace('/storage/', '', $restaurant->logo);

            if (! $relativePath || ! Storage::disk('public')->exists($relativePath)) {
                return response()->json(['message' => 'Logo not found.'], 404);
            }

            $logo = Storage::disk('public')->get($relativePath);
            $mimeType = Storage::disk('public')->mimeType($relativePath);

            $base64Logo = 'data:' . $mimeType . ';base64,' . base64_encode($logo);

            return response()->json(['logo' => $base64Logo], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get logo.',
            ], 500);
        }
    }
}
