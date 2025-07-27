<?php

declare(strict_types=1);

namespace App\Http\Requests\Partner\Auth;

use App\Rules\IsAdult;
use App\Rules\ValidPhoneNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class PartnerRegisterRequest extends FormRequest
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
            'business_name' => ['required', 'string', 'min:1', 'max:50'],
            'street_address' => ['required', 'string', 'min:1', 'max:50'],
            'building_number' => ['required', 'string', 'min:1', 'max:50'],
            'postcode' => ['required', 'string', 'min:1', 'max:50'],
            'city' => ['required', 'string', 'min:1', 'max:50'],
            'state' => ['required', 'string', 'min:1', 'max:50'],
            'first_name' => ['required', 'string', 'min:1', 'max:50'],
            'last_name' => ['required', 'string', 'min:1', 'max:50'],
            'email' => ['required', 'email'],
            'phone_number' => ['required', 'string', 'min:1', 'max:50', new ValidPhoneNumber('IT')],
            'date_of_birth' => ['required', 'string', 'min:1', new IsAdult()],
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
                'confirmed',
            ],
        ];
    }
}
