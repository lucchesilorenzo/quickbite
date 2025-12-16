<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Enums\UserRole;
use App\Exceptions\Private\InvalidCredentialsException;
use App\Exceptions\Private\Rider\UnauthorizedException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Models\User;
use App\Services\Shared\LocationService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(
        private readonly LocationService $locationService
    ) {}

    public function register(array $data): string
    {
        return DB::transaction(function () use ($data) {
            $rider = $this->createRider($data);
            $locationData = $this->locationService->getLocationData($data);

            if ($locationData === null) {
                throw new LocationNotFoundException;
            }

            return $rider->createToken('rider_web_token')->plainTextToken;
        });
    }

    public function login(array $data): string
    {
        $rider = User::query()
            ->where('email', $data['email'])
            ->first();

        if (! $rider || ! Hash::check($data['password'], $rider->password)) {
            throw new InvalidCredentialsException;
        }

        if (! $rider->hasRole(UserRole::RIDER)) {
            throw new UnauthorizedException;
        }

        return $rider->createToken('rider_web_token')->plainTextToken;
    }

    public function logout(User $rider): void
    {
        $rider->currentAccessToken()->delete();
    }

    private function createRider(array $data): User
    {
        $rider = User::query()->create([
            ...$data,
            'password' => bcrypt($data['password']),
        ]);

        $rider->assignRole(UserRole::RIDER);

        return $rider;
    }
}
