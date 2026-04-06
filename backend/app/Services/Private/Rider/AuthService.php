<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Enums\UserRole;
use App\Exceptions\Private\InvalidCredentialsException;
use App\Exceptions\Private\Rider\UnauthorizedException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Models\User;
use App\Services\Private\Shared\TokenService;
use App\Services\Shared\LocationService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(
        private readonly LocationService $locationService,
        private readonly TokenService $tokenService
    ) {}

    public function register(array $data): array
    {
        return DB::transaction(function () use ($data): array {
            $rider = $this->createRider($data);
            $locationData = $this->locationService->getLocationData($data);

            if ($locationData === null) {
                throw new LocationNotFoundException;
            }

            return $this->tokenService->generateTokens($rider);
        });
    }

    public function login(array $data): array
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

        return $this->tokenService->generateTokens($rider);
    }

    public function logout(User $rider, array $data): void
    {
        $rider->currentAccessToken()->delete();
        $this->tokenService->revokeRefreshToken($rider, $data['refresh_token']);
    }

    private function createRider(array $data): User
    {
        $rider = User::query()->create([
            ...$data,
            'password' => bcrypt($data['password']),
        ]);

        $rider->assignRole(UserRole::RIDER);

        event(new Registered($rider));

        return $rider;
    }
}
