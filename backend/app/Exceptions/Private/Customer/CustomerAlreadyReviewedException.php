<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Customer;

use Exception;

class CustomerAlreadyReviewedException extends Exception
{
    public function __construct(
        string $message = 'You have already reviewed this order.',
        int $code = 409
    ) {
        parent::__construct($message, $code);
    }
}
