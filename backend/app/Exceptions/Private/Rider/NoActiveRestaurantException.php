<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Rider;

use Exception;

class NoActiveRestaurantException extends Exception
{
    public function __construct(
        string $message = 'There is no active restaurant for the rider.',
        int $code = 404
    ) {
        parent::__construct($message, $code);
    }
}
