<?php

namespace App\Rules;

use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class IsAdult implements ValidationRule
{
    public function __construct(
        protected int $minAge = 18
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        try {
            $dob = Carbon::parse($value);
        } catch (\Exception $e) {
            $fail('The :attribute must be a valid date.');
            return;
        }

        if ($dob->diffInYears(Carbon::now()) < $this->minAge) {
            $fail("You must be at least {$this->minAge} years old.");
        }
    }
}
