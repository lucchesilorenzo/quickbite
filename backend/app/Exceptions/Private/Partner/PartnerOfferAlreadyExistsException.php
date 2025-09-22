<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class PartnerOfferAlreadyExistsException extends Exception
{
    public function __construct(
        string $message = 'An offer with the same discount rate already exists.',
        int $code = 422
    ) {
        parent::__construct($message, $code);
    }
}
