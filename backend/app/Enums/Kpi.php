<?php

declare(strict_types=1);

namespace App\Enums;

enum Kpi: string
{
    case ACCEPTED_ORDERS = 'accepted_orders';
    case REVENUE = 'revenue';
    case REJECTED_ORDERS = 'rejected_orders';
    case LOST_REVENUE = 'lost_revenue';
}
