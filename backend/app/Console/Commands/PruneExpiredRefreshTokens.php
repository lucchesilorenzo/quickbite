<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\PersonalRefreshToken;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('auth:prune-expired-refresh-tokens')]
#[Description('Delete expired refresh tokens')]
class PruneExpiredRefreshTokens extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        PersonalRefreshToken::query()
            ->where('expires_at', '<', now())
            ->delete();
    }
}
