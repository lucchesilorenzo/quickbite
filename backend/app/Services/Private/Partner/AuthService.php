<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Enums\DeliveryDay;
use App\Enums\RestaurantRole;
use App\Enums\UserRole;
use App\Exceptions\Private\InvalidCredentialsException;
use App\Exceptions\Private\Partner\UnauthorizedException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Models\Restaurant;
use App\Models\User;
use App\Services\Private\Shared\TokenService;
use App\Services\Shared\LocationService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthService
{
    public function __construct(
        private readonly LocationService $locationService,
        private readonly TokenService $tokenService
    ) {}

    public function register(array $data): array
    {
        return DB::transaction(function () use ($data): array {
            $partner = $this->createPartner($data);
            $locationData = $this->locationService->getLocationData($data);

            if ($locationData === null) {
                throw new LocationNotFoundException;
            }

            $restaurant = $this->createRestaurant($data, $locationData);
            $this->setupDeliveryDays($restaurant);

            $partner->restaurants()->attach($restaurant->id, [
                'role' => RestaurantRole::OWNER,
            ]);

            return $this->tokenService->generateTokens($partner);
        });
    }

    public function login(array $data): array
    {
        $partner = User::query()
            ->where('email', $data['email'])
            ->first();

        if (! $partner || ! Hash::check($data['password'], $partner->password)) {
            throw new InvalidCredentialsException;
        }

        if (! $partner->hasRole(UserRole::PARTNER)) {
            throw new UnauthorizedException;
        }

        return $this->tokenService->generateTokens($partner);
    }

    public function logout(User $partner, array $data): void
    {
        $partner->currentAccessToken()->delete();
        $this->tokenService->revokeRefreshToken($partner, $data['refresh_token']);
    }

    private function createPartner(array $data): User
    {
        $partner = User::query()->create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone_number' => $data['phone_number'],
            'date_of_birth' => $data['date_of_birth'],
            'password' => bcrypt($data['password']),
        ]);

        $partner->assignRole(UserRole::PARTNER);

        event(new Registered($partner));

        return $partner;
    }

    private function createRestaurant(array $data, array $locationData): Restaurant
    {
        return Restaurant::query()->create([
            'name' => $data['business_name'],
            'slug' => Str::slug($data['business_name'] . '-' . Str::orderedUuid()),
            'street_address' => $data['street_address'],
            'building_number' => $data['building_number'],
            'postcode' => $data['postcode'],
            'city' => $data['city'],
            'state' => $data['state'],
            'latitude' => $locationData['lat'],
            'longitude' => $locationData['lon'],
        ]);
    }

    private function setupDeliveryDays(Restaurant $restaurant): void
    {
        $deliveryDays = collect(DeliveryDay::values())
            ->map(fn ($day, $index): array => [
                'day' => $day,
                'start_time' => null,
                'end_time' => null,
                'order' => $index,
            ]);

        $restaurant->deliveryDays()->createMany($deliveryDays);
    }
}
