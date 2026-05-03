<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schedule;

Schedule::command('auth:clear-resets')->everyFifteenMinutes();
Schedule::command('sanctum:prune-expired --hours=24')->daily();
Schedule::command('auth:prune-expired-refresh-tokens')->daily();
Schedule::command('app:expire-pending-orders')->everyMinute();
