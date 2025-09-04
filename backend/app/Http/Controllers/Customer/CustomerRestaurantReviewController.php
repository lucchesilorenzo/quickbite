<?php

declare(strict_types=1);

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\Review\CustomerCreateReviewRequest;
use App\Services\Customer\CustomerReviewService;
use Illuminate\Http\JsonResponse;
use Throwable;

class CustomerRestaurantReviewController extends Controller
{
    public function __construct(
        private CustomerReviewService $customerReviewService
    ) {}

    /**
     * Create a customer's review.
     */
    public function createCustomerReview(
        CustomerCreateReviewRequest $request,
        string $restaurantSlug
    ): JsonResponse {
        $data = $request->validated();

        try {
            $user = auth()->user();

            $review = $this->customerReviewService->createReview(
                $user,
                $restaurantSlug,
                $data,
            );

            return response()->json([
                'review' => $review,
                'message' => 'Review created successfully.',
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not create review.',
            ], 500);
        }
    }
}
