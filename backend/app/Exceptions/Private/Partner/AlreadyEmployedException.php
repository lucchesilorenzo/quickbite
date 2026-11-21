<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class AlreadyEmployedException extends Exception
{
    public function __construct(
        ?string $message = null,
        int $code = 409
    ) {
        parent::__construct($message ?? __('messages.exceptions.rider_already_employed'), $code);
    }
}
