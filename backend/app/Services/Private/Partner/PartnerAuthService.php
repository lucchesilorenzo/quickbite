<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Enums\DeliveryDay;
use App\Enums\RestaurantRole;
use App\Enums\UserRole;
use App\Models\Restaurant;
use App\Models\User;
use App\Services\Shared\LocationService;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PartnerAuthService
{
    public function __construct(
        private LocationService $locationService,
    ) {}

    public function register(array $data): string
    {
        return DB::transaction(function () use ($data) {
            $partner = $this->createPartner($data);
            $locationData = $this->locationService->getLocationData($data);

            if (! $locationData) {
                throw new Exception('Location not found.', 404);
            }

            $restaurant = $this->createRestaurant($data, $locationData);
            $this->setupDeliveryDays($restaurant);

            $partner->restaurants()->attach($restaurant->id, [
                'role' => RestaurantRole::OWNER,
            ]);

            return $partner->createToken('partner_web_token')->plainTextToken;
        });
    }

    public function login(array $data): string
    {
        $partner = User::where('email', $data['email'])->first();

        if (! $partner || ! Hash::check($data['password'], $partner->password)) {
            throw new Exception('Invalid credentials.', 401);
        }

        if (! $partner->hasRole(UserRole::PARTNER)) {
            throw new Exception(
                'You are not authorized to log in as a partner.',
                403
            );
        }

        return $partner->createToken('partner_web_token')->plainTextToken;
    }

    public function logout(User $partner): void
    {
        $partner->currentAccessToken()->delete();
    }

    private function createPartner(array $data): User
    {
        $partner = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone_number' => $data['phone_number'],
            'date_of_birth' => $data['date_of_birth'],
            'password' => bcrypt($data['password']),
        ]);

        $partner->assignRole(UserRole::PARTNER);

        return $partner;
    }

    private function createRestaurant(array $data, array $locationData): Restaurant
    {
        return Restaurant::create([
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
    }

    private function setupDeliveryDays(Restaurant $restaurant): void
    {
        $deliveryDays = collect(DeliveryDay::values())->map(function ($day, $i) {
            return [
                'day' => $day,
                'start_time' => null,
                'end_time' => null,
                'order' => $i,
            ];
        });

        $restaurant->deliveryDays()->createMany($deliveryDays);
    }
}
