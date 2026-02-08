<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Customer;

use Exception;

class CustomerHasSocialLoginException extends Exception
{
    public function __construct(
        string $message = 'Customer has social login. Please log in with social login or with an existing password.',
        int $code = 400
    ) {
        parent::__construct($message, $code);
    }
}
