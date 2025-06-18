<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CustomerRegisterRequest;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
  /**
   * Register a new customer.
   *
   * @param CustomerRegisterRequest $request
   * @return JsonResponse
   */
  public function register(CustomerRegisterRequest $request): JsonResponse
  {
    // Get validated data
    $validatedData = $request->validated();

    return response()->json($validatedData);

    try {
    } catch (\Throwable $e) {
      return response()->json([
        'message' => 'Could not register customer.',
      ], 500);
    }
  }
}
