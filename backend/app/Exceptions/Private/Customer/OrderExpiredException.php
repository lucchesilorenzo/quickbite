<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Customer;

use Exception;

class OrderExpiredException extends Exception
{
    public function __construct(
        string $message = 'The order has expired.',
        int $code = 409
    ) {
        parent::__construct($message, $code);
    }
}
