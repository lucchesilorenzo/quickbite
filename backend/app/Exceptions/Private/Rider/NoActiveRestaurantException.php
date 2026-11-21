<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Rider;

use Exception;

class NoActiveRestaurantException extends Exception
{
    public function __construct(
        ?string $message = null,
        int $code = 404
    ) {
        parent::__construct($message ?? __('messages.exceptions.no_active_restaurant'), $code);
    }
}
