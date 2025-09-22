<?php

declare(strict_types=1);

namespace App\Exceptions\Public\Restaurant;

use Exception;

class RestaurantLogoNotFoundException extends Exception
{
    public function __construct(
        string $message = 'Restaurant logo not found.',
        int $code = 404
    ) {
        parent::__construct($message, $code);
    }
}
