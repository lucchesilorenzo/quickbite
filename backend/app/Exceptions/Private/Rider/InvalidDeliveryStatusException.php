<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Rider;

use Exception;

class InvalidDeliveryStatusException extends Exception
{
    public function __construct(
        string $message = 'Invalid delivery status.',
        int $code = 400
    ) {
        parent::__construct($message, $code);
    }
}
