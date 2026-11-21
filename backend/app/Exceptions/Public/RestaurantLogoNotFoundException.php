<?php

declare(strict_types=1);

namespace App\Exceptions\Public;

use Exception;

class RestaurantLogoNotFoundException extends Exception
{
    public function __construct(
        ?string $message = null,
        int $code = 404
    ) {
        parent::__construct($message ?? __('messages.exceptions.restaurant_logo_not_found'), $code);
    }
}
