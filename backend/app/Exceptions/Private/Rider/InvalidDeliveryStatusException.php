<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Rider;

use Exception;

class InvalidDeliveryStatusException extends Exception
{
    public function __construct(
        ?string $message = null,
        int $code = 400
    ) {
        parent::__construct($message ?? __('messages.exceptions.invalid_delivery_status'), $code);
    }
}
