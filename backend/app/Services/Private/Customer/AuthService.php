<?php

declare(strict_types=1);

namespace App\Services\Private\Customer;

use App\Enums\UserRole;
use App\Exceptions\Private\Customer\CustomerHasSocialLoginException;
use App\Exceptions\Private\Customer\UnauthorizedException;
use App\Exceptions\Private\InvalidCredentialsException;
use App\Models\User;
use App\Services\Private\Shared\TokenService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(
        private readonly TokenService $tokenService
    ) {}

    public function register(array $data): array
    {
        $customer = User::query()->where('email', $data['email'])->first();

        if ($customer) {
            if ($customer->socialProviders()->exists()) {
                throw new CustomerHasSocialLoginException;
            }

            throw new InvalidCredentialsException('Email already exists.');
        }

        $customer = User::query()->create([
            ...$data,
            'password' => bcrypt($data['password']),
        ]);

        $customer->assignRole(UserRole::CUSTOMER);

        event(new Registered($customer));

        return $this->tokenService->generateTokens($customer);
    }

    public function login(array $data): array
    {
        $customer = User::query()
            ->where('email', $data['email'])
            ->first();

        if (! $customer) {
            throw new InvalidCredentialsException;
        }

        if ($customer->socialProviders()->exists() && $customer->password === null) {
            throw new CustomerHasSocialLoginException;
        }

        if (! Hash::check($data['password'], $customer->password)) {
            throw new InvalidCredentialsException;
        }

        if (! $customer->hasRole(UserRole::CUSTOMER)) {
            throw new UnauthorizedException;
        }

        return $this->tokenService->generateTokens($customer);
    }

    public function logout(User $customer, array $data): void
    {
        $customer->currentAccessToken()->delete();
        $this->tokenService->revokeRefreshToken($customer, $data['refresh_token']);
    }
}
