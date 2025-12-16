<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Rider;

use Exception;

class UnauthorizedException extends Exception
{
    public function __construct(
        string $message = 'You are not authorized to log in as a rider.',
        int $code = 403
    ) {
        parent::__construct($message, $code);
    }
}
