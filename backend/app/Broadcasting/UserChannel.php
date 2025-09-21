<?php

declare(strict_types=1);

namespace App\Broadcasting;

use App\Models\User;

class UserChannel
{
    /**
     * Create a new channel instance.
     */
    public function __construct() {}

    /**
     * Authenticate the user's access to the channel.
     */
    public function join(User $user, string $userId): bool
    {
        return (string) $user->id === $userId;
    }
}
