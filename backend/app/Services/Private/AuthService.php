<?php

declare(strict_types=1);

namespace App\Services\Private;

use App\Models\User;
use Illuminate\Support\Collection;

class AuthService
{
    public function me(User $user): Collection
    {
        return $user->getRoleNames();
    }
}
