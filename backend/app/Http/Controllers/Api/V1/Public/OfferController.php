<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\Offer\OfferResource;
use App\Models\Restaurant;
use App\Services\Public\OfferService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\QueryParameter;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Public Offers')]
class OfferController extends Controller
{
    public function __construct(
        private readonly OfferService $offerService
    ) {}

    /**
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'getOffers',
        title: 'Get offers of a restaurant',
        description: 'Get offers of a restaurant.',
        method: 'GET'
    )]
    #[QueryParameter(name: 'page', description: 'Page number.', required: false, type: 'integer', example: 1)]
    #[Response(status: 200, description: 'Offers retrieved successfully.')]
    #[Response(status: 500, description: 'Could not get offers.')]
    public function getOffers(Restaurant $restaurant): JsonResponse
    {
        try {
            $offers = $this->offerService->getOffers($restaurant);

            return OfferResource::collection($offers)
                ->additional([
                    'success' => true,
                    'message' => 'Offers retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get offers.',
            ], 500);
        }
    }
}
