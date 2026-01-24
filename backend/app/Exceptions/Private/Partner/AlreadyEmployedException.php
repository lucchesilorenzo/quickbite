<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class AlreadyEmployedException extends Exception
{
    public function __construct(
        string $message = 'This rider is already employed.',
        int $code = 409
    ) {
        parent::__construct($message, $code);
    }
}
