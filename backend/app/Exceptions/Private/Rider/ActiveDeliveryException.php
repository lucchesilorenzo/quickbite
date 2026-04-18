<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Rider;

use Exception;

class ActiveDeliveryException extends Exception
{
    public function __construct(
        string $message = 'There is an active delivery for the rider.',
        int $code = 409
    ) {
        parent::__construct($message, $code);
    }
}
