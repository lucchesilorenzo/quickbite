<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Customer\Review\CustomerCreateReviewRequest;
use App\Services\Private\Customer\CustomerReviewService;
use Exception;
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
