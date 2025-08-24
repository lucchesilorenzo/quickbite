<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Enums\DeliveryDay;
use App\Enums\RestaurantRole;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\Auth\PartnerLoginRequest;
use App\Http\Requests\Partner\Auth\PartnerRegisterRequest;
use App\Models\Restaurant;
use App\Models\User;
use App\Services\LocationService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Throwable;

class PartnerAuthController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(private LocationService $locationService) {}

    /**
     * Register a new partner.
     */
    public function register(PartnerRegisterRequest $request): JsonResponse
    {
        // Validate data
        $data = $request->validated();

        try {
            $result = DB::transaction(function () use ($data) {
                // Create partner
                $partner = User::create([
                    'first_name' => $data['first_name'],
                    'last_name' => $data['last_name'],
                    'email' => $data['email'],
                    'phone_number' => $data['phone_number'],
                    'date_of_birth' => $data['date_of_birth'],
                    'password' => bcrypt($data['password']),
                ]);

                // Assign role
                $partner->assignRole(UserRole::PARTNER);

                // Get location
                $locationData = $this->locationService->getLocationData($data);

                if (! $locationData) {
                    throw new Exception('Location not found.');
                }

                // Create restaurant
                $restaurant = Restaurant::create([
                    'name' => $data['business_name'],
                    'slug' => Str::slug($data['business_name'] . '-' . Str::orderedUuid()),
                    'street_address' => $data['street_address'],
                    'building_number' => $data['building_number'],
                    'postcode' => $data['postcode'],
                    'city' => $data['city'],
                    'state' => $data['state'],
                    'full_address' => "{$data['street_address']} {$data['building_number']}, {$data['postcode']} {$data['city']}, {$data['state']}",
                    'latitude' => $locationData['lat'],
                    'longitude' => $locationData['lon'],
                ]);

                // Populate delivery days
                $deliveryDays = collect(DeliveryDay::values())->map(function ($day, $i) {
                    return [
                        'day' => $day,
                        'start_time' => null,
                        'end_time' => null,
                        'order' => $i,
                    ];
                });

                // Create delivery days
                $restaurant->deliveryDays()->createMany($deliveryDays);

                $partner->restaurants()->attach($restaurant->id, [
                    'role' => RestaurantRole::OWNER,
                ]);

                $token = $partner->createToken('partner_web_token')->plainTextToken;

                return [
                    'token' => $token,
                ];
            });

            return response()->json([
                'message' => 'Partner registered successfully.',
                'token' => $result['token'],
            ], 201);
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'Partner already exists.',
                ], 409);
            }

            if ($e->getMessage() === 'Location not found.') {
                return response()->json([
                    'message' => $e->getMessage(),
                ], 404);
            }

            return response()->json([
                'message' => 'Could not register partner.',
            ], 500);
        }
    }

    /**
     * Login a partner.
     */
    public function login(PartnerLoginRequest $request): JsonResponse
    {
        // Get validated data
        $data = $request->validated();

        try {
            // Get partner
            $partner = User::where('email', $data['email'])->first();

            // Check if partner exists
            if (! $partner) {
                return response()->json([
                    'message' => 'Partner not found.',
                ], 404);
            }

            // Check if partner has PARTNER role
            if (! $partner->hasRole(UserRole::PARTNER)) {
                return response()->json([
                    'message' => 'You are not authorized to log in as a partner.',
                ], 403);
            }

            // Check if password is correct
            if (! Hash::check($data['password'], $partner->password)) {
                return response()->json([
                    'message' => 'Invalid credentials.',
                ], 401);
            }

            // Generate token
            $token = $partner->createToken('partner_web_token')->plainTextToken;

            return response()->json([
                'message' => 'Partner logged in successfully.',
                'token' => $token,
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not login partner.',
            ], 500);
        }
    }

    /**
     * Logout a partner.
     */
    public function logout(): JsonResponse
    {
        try {
            auth()->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Partner logged out successfully.',
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not logout partner.',
            ], 500);
        }
    }
}
