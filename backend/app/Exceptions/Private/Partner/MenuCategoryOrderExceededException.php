<?php

declare(strict_types=1);

namespace App\Exceptions\Private\Partner;

use Exception;

class MenuCategoryOrderExceededException extends Exception
{
    public function __construct(
        ?string $message = null,
        int $code = 422
    ) {
        parent::__construct($message ?? __('messages.exceptions.menu_category_order_exceeded'), $code);
    }
}
