<?php

namespace App\Http\Controllers\Customer;

use App\Enums\RolesEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CustomerLoginRequest;
use App\Http\Requests\Auth\CustomerRegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

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

  /**
   * Login a customer.
   *
   * @param CustomerLoginRequest $request
   * @return JsonResponse
   */
  public function login(CustomerLoginRequest $request): JsonResponse
  {
    // Get validated data
    $data = $request->validated();

    try {
      // Get customer
      $customer = User::where('email', $data['email'])->first();

      // Check if customer exists
      if (empty($customer)) {
        return response()->json([
          'message' => 'Customer not found.',
        ], 404);
      }

      // Check if password is correct
      if (!Hash::check($data['password'], $customer->password)) {
        return response()->json([
          'message' => 'Invalid credentials.',
        ], 401);
      }

      // Check if customer has CUSTOMER role
      if (!$customer->hasRole(RolesEnum::CUSTOMER)) {
        return response()->json([
          'message' => 'You are not authorized to log in as a customer.',
        ], 403);
      }

      // Generate token
      $token = $customer->createToken('customer_web_token')->plainTextToken;

      return response()->json([
        'message' => 'Customer logged in successfully.',
        'token' => $token,
        'role' => RolesEnum::CUSTOMER,
        'customer' => $customer,
      ], 200);
    } catch (\Throwable $e) {
      return response()->json([
        'message' => 'Could not login customer.',
      ], 500);
    }
  }

  /**
   * Logout a customer.
   *
   * @return JsonResponse
   */
  public function logout(): JsonResponse
  {
    try {
      auth()->user()->currentAccessToken()->delete();

      return response()->json([
        'message' => 'Customer logged out successfully.',
      ], 200);
    } catch (\Throwable $e) {
      return response()->json([
        'message' => 'Could not logout customer.',
      ], 500);
    }
  }
}
