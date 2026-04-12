<?php

declare(strict_types=1);

namespace App\Services\Private\Shared;

use App\Models\User;
use Illuminate\Support\Str;

class TokenService
{
    public function generateTokens(User $user): array
    {
        $rtExpiration = (int) config('sanctum.rt_expiration');

        $accessToken = $user->createToken('web')->plainTextToken;
        $refreshToken = Str::random(40);

        $user->personalRefreshTokens()->create([
            'token' => hash('sha256', $refreshToken),
            'expires_at' => now()->addMinutes($rtExpiration),
        ]);

        return [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ];
    }

    public function revokeRefreshToken(User $user, string $refreshToken): void
    {
        $user->personalRefreshTokens()
            ->where('token', hash('sha256', $refreshToken))
            ->delete();
    }
}
