<?php

declare(strict_types=1);

namespace App\Services\Private;

use App\Models\PersonalRefreshToken;
use App\Models\User;

class AuthService
{
    public function me(User $user): User
    {
        return $user->load('notificationPreferences', 'roles');
    }

    public function refresh(array $data): array
    {
        $tokenHash = hash('sha256', (string) $data['refresh_token']);

        $token = PersonalRefreshToken::query()->where('token', $tokenHash)
            ->where('expires_at', '>', now())
            ->firstOrFail();

        $accessToken = $token->user->createToken('web')->plainTextToken;

        $token->update([
            'last_used_at' => now(),
        ]);

        return [
            'access_token' => $accessToken,
            'refresh_token' => $data['refresh_token'],
        ];
    }
}
