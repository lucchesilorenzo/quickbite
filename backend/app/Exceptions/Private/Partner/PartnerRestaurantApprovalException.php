<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class PartnerRestaurantApprovalException extends Exception
{
    public function __construct(
        string $message = 'Cannot approve restaurant: some required fields are missing.',
        int $code = 422
    ) {
        parent::__construct($message, $code);
    }
}
