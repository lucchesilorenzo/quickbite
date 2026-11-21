<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Customer;

use Exception;

class OrderExpiredException extends Exception
{
    public function __construct(
        ?string $message = null,
        int $code = 409
    ) {
        parent::__construct($message ?? __('messages.exceptions.order_expired'), $code);
    }
}
