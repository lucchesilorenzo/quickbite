<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use libphonenumber\PhoneNumberUtil;

class ValidPhoneNumber implements ValidationRule
{
    public function __construct(
        protected string $countryCode
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        try {
            $phoneNumberUtil = PhoneNumberUtil::getInstance();

            $phoneNumber = $phoneNumberUtil->parse($value, $this->countryCode);
            $phoneNumberCountryCode = $phoneNumberUtil->getRegionCodeForNumber($phoneNumber);

            if ($phoneNumberCountryCode !== $this->countryCode) {
                $fail("The country code of the phone number is not {$this->countryCode}");
                return;
            }

            if (!$phoneNumberUtil->isValidNumber($phoneNumber)) {
                $fail('The phone number is not valid.');
            }
        } catch (\Throwable $e) {
            $fail('The phone number could not be parsed.');
        }
    }
}
