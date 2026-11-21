<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class NoAvailableRidersException extends Exception
{
    public function __construct(
        ?string $message = null,
        int $code = 409
    ) {
        parent::__construct($message ?? __('messages.exceptions.no_available_riders'), $code);
    }
}
