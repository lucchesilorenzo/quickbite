<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class NoAvailableRidersException extends Exception
{
    public function __construct(
        string $message = 'All active riders are currently busy.',
        int $code = 409
    ) {
        parent::__construct($message, $code);
    }
}
