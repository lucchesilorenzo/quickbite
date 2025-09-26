<?php

declare(strict_types=1);

namespace App\Enums;

enum RestaurantSortBy: string
{
    case REVIEW_RATING = 'review_rating';
    case DISTANCE = 'distance';
    case MINIMUM_ORDER_VALUE = 'minimum_order_value';
    case DELIVERY_TIME = 'delivery_time';
    case DELIVERY_FEE = 'delivery_fee';
}
