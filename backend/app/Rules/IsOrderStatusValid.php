<?php

declare(strict_types=1);

namespace App\Rules;

use App\Enums\OrderStatus;
use App\Models\Order;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class IsOrderStatusValid implements ValidationRule
{
    public function __construct(
        protected Order $order
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $partnerStatusTransitions = OrderStatus::partnerTransitions();

        if (! in_array($value, $partnerStatusTransitions[$this->order->status])) {
            $fail('Order status is not valid.');
        }
    }
}
