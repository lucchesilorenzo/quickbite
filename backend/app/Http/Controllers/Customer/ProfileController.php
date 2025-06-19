<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\UpdateProfileRequest;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
  /**
   * Update a customer's profile.
   *
   * @return JsonResponse
   */
  public function updateProfile(UpdateProfileRequest $request): JsonResponse
  {
    $data = $request->validated();

    try {
      $user = auth()->user();
      $user->update($data);

      return response()->json([
        'message' => 'Profile updated successfully.',
      ], 200);
    } catch (\Throwable $e) {
      return response()->json([
        'message' => 'Could not update profile.',
      ], 500);
    }
  }
}
