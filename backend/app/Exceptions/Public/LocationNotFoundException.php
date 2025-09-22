<?php

declare(strict_types=1);

namespace App\Exceptions\Public;

use Exception;

class LocationNotFoundException extends Exception
{
    public function __construct(
        string $message = 'Location not found.',
        int $code = 404
    ) {
        parent::__construct($message, $code);
    }
}
