<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Customer;

use App\Exceptions\Private\Customer\CustomerAlreadyReviewedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Customer\Review\CreateReviewRequest;
use App\Http\Resources\Api\V1\Review\ReviewResource;
use App\Services\Private\Customer\ReviewService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\PathParameter;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Customer Reviews')]
class ReviewController extends Controller
{
    public function __construct(
        private readonly ReviewService $reviewService
    ) {}

    #[Endpoint(
        operationId: 'createCustomerReview',
        title: 'Create review',
        description: 'Create a review for a restaurant based on one of the authenticated customer orders.',
        method: 'POST'
    )]
    #[PathParameter(
        name: 'restaurantSlug',
        description: 'Slug of the restaurant to review.',
        required: true,
        example: 'restaurant-a1f7600a-f582-45c1-8004-f3931af8c431'
    )]
    #[Response(status: 201, description: 'Review created successfully.')]
    #[Response(status: 404, description: 'Restaurant not found.')]
    #[Response(status: 409, description: 'A review has already been submitted for this order.')]
    #[Response(status: 500, description: 'An unexpected error occurred while creating the review.')]
    public function createReview(
        CreateReviewRequest $request,
        string $restaurantSlug
    ): JsonResponse {
        try {
            $review = $this->reviewService->createReview(
                auth()->user(),
                $request->validated(),
                $restaurantSlug,
            );

            return ReviewResource::make($review)
                ->additional([
                    'success' => true,
                    'message' => 'Review created successfully.',
                ])
                ->response()
                ->setStatusCode(201);
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => 'Restaurant not found.',
            ], 404);
        } catch (CustomerAlreadyReviewedException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 409);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create review.',
            ], 500);
        }
    }
}
