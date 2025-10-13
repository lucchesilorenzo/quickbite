<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Customer;

use App\Exceptions\Private\Customer\CustomerAlreadyReviewedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Customer\Review\CreateReviewRequest;
use App\Services\Private\Customer\ReviewService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Throwable;

class ReviewController extends Controller
{
    public function __construct(
        private readonly ReviewService $reviewService
    ) {}

    /**
     * Create a customer's review.
     */
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

            return response()->json([
                'review' => $review,
                'message' => 'Review created successfully.',
            ], 201);
        } catch (ModelNotFoundException) {
            return response()->json([
                'message' => 'Restaurant not found.',
            ], 404);
        } catch (CustomerAlreadyReviewedException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not create review.',
            ], 500);
        }
    }
}
