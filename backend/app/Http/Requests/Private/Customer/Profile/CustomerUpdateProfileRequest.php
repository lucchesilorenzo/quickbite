<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Customer\Profile;

use App\Rules\IsAdult;
use App\Rules\ValidPhoneNumber;
use Illuminate\Foundation\Http\FormRequest;

class CustomerUpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['sometimes', 'string', 'min:1', 'max:50'],
            'last_name' => ['sometimes', 'string', 'min:1', 'max:50'],
            'email' => ['sometimes', 'email'],
            'phone_number' => ['sometimes', 'string', 'min:1', 'max:50', new ValidPhoneNumber('IT')],
            'date_of_birth' => ['sometimes', 'string', 'min:1', new IsAdult],
            'street_address' => ['sometimes', 'string', 'min:1', 'max:50'],
            'building_number' => ['sometimes', 'string', 'min:1', 'max:50'],
            'postcode' => ['sometimes', 'string', 'min:1', 'max:50'],
            'city' => ['sometimes', 'string', 'min:1', 'max:50'],
        ];
    }
}
