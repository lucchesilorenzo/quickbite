<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Customer;

use Exception;

class CustomerUnauthorizedException extends Exception
{
    public function __construct(
        string $message = 'You are not authorized to log in as a customer.',
        int $code = 403
    ) {
        parent::__construct($message, $code);
    }
}
