<?php

namespace App\Exceptions\Private\Customer;

use Exception;

class CustomerRestaurantNotAvailableException extends Exception
{
    public function __construct(
        string $message = 'The restaurant is not open or the subtotal is less than the minimum amount.',
        int $code = 400
    ) {
        parent::__construct($message, $code);
    }
}
