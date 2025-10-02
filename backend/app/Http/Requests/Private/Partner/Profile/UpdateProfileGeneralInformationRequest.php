<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Partner\Profile;

use App\Rules\IsAdult;
use App\Rules\ValidPhoneNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileGeneralInformationRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'phone_number' => [
                'required',
                'string',
                'max:50',
                new ValidPhoneNumber('IT'),
                Rule::unique('users')->ignore(auth()->user()->id),
            ],
            'date_of_birth' => ['required', 'date', 'date_format:Y-m-d', new IsAdult],
            'street_address' => ['required', 'string', 'max:50'],
            'building_number' => ['required', 'string', 'max:50'],
            'postcode' => ['required', 'string', 'max:50'],
            'city' => ['required', 'string', 'max:50'],
            'state' => ['required', 'string', 'max:50'],
        ];
    }
}
