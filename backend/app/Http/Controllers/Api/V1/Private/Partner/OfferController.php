<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Exceptions\Private\Partner\OfferAlreadyExistsException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\Offer\CreateOfferRequest;
use App\Http\Requests\Api\V1\Private\Partner\Offer\UpdateOfferRequest;
use App\Http\Resources\Api\V1\Offer\OfferResource;
use App\Models\Offer;
use App\Models\Restaurant;
use App\Services\Private\Partner\OfferService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\IgnoreResponse;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Partner Offers')]
class OfferController extends Controller
{
    public function __construct(
        private readonly OfferService $offerService
    ) {}

    /**
     * Get all offers.
     */
    #[Endpoint(
        operationId: 'getPartnerOffers',
        title: 'List offers',
        description: 'List offers for a restaurant.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Offers retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving offers.',
    )]
    public function getOffers(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewAny', [Offer::class, $restaurant]);

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

    /**
     * Create an offer.
     */
    #[Endpoint(
        operationId: 'createPartnerOffer',
        title: 'Create offer',
        description: 'Create a new offer for a restaurant.',
        method: 'POST'
    )]
    #[IgnoreResponse(200)]
    #[Response(
        status: 201,
        description: 'Offer created successfully.',
    )]
    #[Response(
        status: 422,
        description: 'An offer already exists for this restaurant.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while creating offer.',
    )]
    public function createOffer(
        CreateOfferRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('create', [Offer::class, $restaurant]);

        try {
            $offer = $this->offerService->createOffer(
                $request->validated(),
                $restaurant,
            );

            return OfferResource::make($offer)
                ->additional([
                    'success' => true,
                    'message' => 'Offer created successfully.',
                ])
                ->response()
                ->setStatusCode(201);
        } catch (OfferAlreadyExistsException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create offer.',
            ], 500);
        }
    }

    /**
     * Update an offer.
     */
    #[Endpoint(
        operationId: 'updatePartnerOffer',
        title: 'Update offer',
        description: 'Update an existing offer.',
        method: 'PATCH'
    )]
    #[Response(
        status: 200,
        description: 'Offer updated successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating offer.',
    )]
    public function updateOffer(
        UpdateOfferRequest $request,
        Restaurant $restaurant,
        Offer $offer
    ): JsonResponse {
        Gate::authorize('update', $offer);

        try {
            $offer = $this->offerService->updateOffer(
                $request->validated(),
                $restaurant,
                $offer
            );

            return OfferResource::make($offer)
                ->additional([
                    'success' => true,
                    'message' => 'Offer updated successfully.',
                ])
                ->response();
        } catch (OfferAlreadyExistsException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update offer.',
            ], 500);
        }
    }

    /**
     * Delete an offer.
     */
    #[Endpoint(
        operationId: 'deletePartnerOffer',
        title: 'Delete offer',
        description: 'Delete an offer.',
        method: 'DELETE'
    )]
    #[Response(
        status: 200,
        description: 'Offer deleted successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while deleting offer.',
    )]
    public function deleteOffer(Offer $offer): JsonResponse
    {
        Gate::authorize('delete', $offer);

        try {
            $this->offerService->deleteOffer($offer);

            return response()->json([
                'success' => true,
                'message' => 'Offer deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not delete offer.',
            ], 500);
        }
    }
}
