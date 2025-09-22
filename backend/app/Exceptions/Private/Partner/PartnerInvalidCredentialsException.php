<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class PartnerInvalidCredentialsException extends Exception
{
    public function __construct(
        string $message = 'Invalid credentials.',
        int $code = 401
    ) {
        parent::__construct($message, $code);
    }
}
