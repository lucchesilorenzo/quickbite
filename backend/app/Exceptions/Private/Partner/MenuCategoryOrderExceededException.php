<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class MenuCategoryOrderExceededException extends Exception
{
    public function __construct(
        string $message = 'You have reached the maximum number of menu categories.',
        int $code = 422
    ) {
        parent::__construct($message, $code);
    }
}
