<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Rider;

use Exception;

class UnauthorizedException extends Exception
{
    public function __construct(
        ?string $message = null,
        int $code = 403
    ) {
        parent::__construct($message ?? __('messages.exceptions.rider_unauthorized'), $code);
    }
}
