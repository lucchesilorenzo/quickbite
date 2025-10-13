<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Private\Partner\PartnerMenuService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class MenuController extends Controller
{
    public function __construct(
        private readonly PartnerMenuService $partnerMenuService
    ) {}

    /**
     * Get partner's restaurant menu.
     */
    public function getMenu(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewPartnerMenu', $restaurant);

        try {
            $menu = $this->partnerMenuService->getMenu($restaurant);

            return response()->json($menu, 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get menu.',
            ], 500);
        }
    }
}
