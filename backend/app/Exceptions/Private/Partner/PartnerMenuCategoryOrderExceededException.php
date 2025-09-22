<?php

namespace App\Exceptions\Private\Partner;

use Exception;

class PartnerMenuCategoryOrderExceededException extends Exception
{
    public function __construct(
        string $message = 'You have reached the maximum number of menu categories.',
        int $code = 422
    ) {
        parent::__construct($message, $code);
    }
}
