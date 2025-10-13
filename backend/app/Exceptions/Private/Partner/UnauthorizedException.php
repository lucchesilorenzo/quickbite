<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class UnauthorizedException extends Exception
{
    public function __construct(
        string $message = 'You are not authorized to log in as a partner.',
        int $code = 403
    ) {
        parent::__construct($message, $code);
    }
}
