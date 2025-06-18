<?php

namespace App\Http\Controllers\Customer;

use App\Enums\RolesEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CustomerRegisterRequest;
use App\Models\User;
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
    $data = $request->validated();

    try {
      // Create customer
      $customer = User::create([
        ...$data,
        'password' => bcrypt($data['password']),
      ]);

      // Assign role
      $customer->assignRole(RolesEnum::CUSTOMER);

      // Generate token
      $token = $customer->createToken('customer_web_token')->plainTextToken;

      return response()->json([
        'message' => 'Customer registered successfully.',
        'token' => $token,
        'role' => RolesEnum::CUSTOMER,
        'customer' => $customer,
      ], 201);
    } catch (\Throwable $e) {
      if ($e->getCode() === 23000) {
        return response()->json([
          'message' => 'Customer already exists.',
        ], 409);
      }

      return response()->json([
        'message' => 'Could not register customer.',
      ], 500);
    }
  }
}
