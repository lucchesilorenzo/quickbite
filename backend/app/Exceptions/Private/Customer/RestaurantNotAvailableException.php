<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Customer;

use Exception;

class RestaurantNotAvailableException extends Exception
{
    public function __construct(
        ?string $message = null,
        int $code = 400
    ) {
        parent::__construct($message ?? __('messages.exceptions.restaurant_not_available'), $code);
    }
}
