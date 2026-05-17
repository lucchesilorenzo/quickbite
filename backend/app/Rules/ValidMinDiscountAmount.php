<?php

declare(strict_types=1);

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class ValidMinDiscountAmount implements ValidationRule
{
    public function __construct(
        protected float $minAmount
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=):PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($value < $this->minAmount) {
            $fail("The :attribute must be less than {$this->minAmount}.");
        }
    }
}
