<?php

declare(strict_types=1);

namespace App\Enums;

enum StatRange: string
{
    case LAST_7_DAYS = '7d';
    case LAST_14_DAYS = '14d';
    case LAST_30_DAYS = '30d';
}
