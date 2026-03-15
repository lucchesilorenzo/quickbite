<?php

declare(strict_types=1);

namespace App\Rules;

use App\Enums\OrderStatus;
use App\Enums\UserRole;
use App\Models\Order;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class IsOrderStatusValid implements ValidationRule
{
    public function __construct(
        protected Order $order,
        protected UserRole $role
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $statusTransitions = $this->role === UserRole::PARTNER
            ? OrderStatus::partnerTransitions()
            : OrderStatus::riderTransitions();

        if (! in_array($value, $statusTransitions[$this->order->status])) {
            $fail('Status is not valid.');
        }
    }
}
