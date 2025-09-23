<?php

declare(strict_types=1);

namespace App\Services\Private;

use App\Models\User;

class AuthService
{
    public function me(User $user): User
    {
        $user->getRoleNames();

        return $user;
    }
}
