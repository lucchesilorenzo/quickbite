<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Rider;

use Exception;

class ActiveDeliveryException extends Exception
{
    public function __construct(
        ?string $message = null,
        int $code = 409
    ) {
        parent::__construct($message ?? __('messages.exceptions.active_delivery'), $code);
    }
}
