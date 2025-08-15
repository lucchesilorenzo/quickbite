<?php

declare(strict_types=1);

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\Profile\CustomerUpdateProfileRequest;
use Illuminate\Http\JsonResponse;
use Throwable;

class CustomerProfileController extends Controller
{
    /**
     * Update a customer's profile.
     */
    public function updateProfile(CustomerUpdateProfileRequest $request): JsonResponse
    {
        // Get validated data
        $data = $request->validated();

        try {
            $user = auth()->user();

            $user->update($data);

            return response()->json([
                'message' => 'Profile updated successfully.',
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update profile.',
            ], 500);
        }
    }
}
