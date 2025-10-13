<?php

declare(strict_types=1);

namespace App\Services\Private\Customer;

use App\Enums\UserRole;
use App\Exceptions\Private\Customer\UnauthorizedException;
use App\Exceptions\Private\InvalidCredentialsException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data): string
    {
        $customer = User::query()->create([
            ...$data,
            'password' => bcrypt($data['password']),
        ]);

        $customer->assignRole(UserRole::CUSTOMER);

        return $customer->createToken('customer_web_token')->plainTextToken;
    }

    public function login(array $data): string
    {
        $customer = User::query()
            ->where('email', $data['email'])
            ->first();

        if (! $customer || ! Hash::check($data['password'], $customer->password)) {
            throw new InvalidCredentialsException;
        }

        if (! $customer->hasRole(UserRole::CUSTOMER)) {
            throw new UnauthorizedException;
        }

        return $customer->createToken('customer_web_token')->plainTextToken;
    }

    public function logout(User $customer): void
    {
        $customer->currentAccessToken()->delete();
    }
}
