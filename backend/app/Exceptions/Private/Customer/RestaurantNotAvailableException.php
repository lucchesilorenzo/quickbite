<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Customer;

use Exception;

class RestaurantNotAvailableException extends Exception
{
    public function __construct(
        string $message = 'The restaurant is not open or the subtotal is less than the minimum amount.',
        int $code = 400
    ) {
        parent::__construct($message, $code);
    }
}
