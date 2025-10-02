<?php

declare(strict_types=1);

namespace App\Services\Private;

use App\Models\User;

class AuthService
{
    public function me(User $user): User
    {
        return $user->load('notificationPreferences', 'roles');
    }
}
