<?php

namespace App\Http\Requests\Auth;

use App\Rules\IsAdult;
use App\Rules\ValidPhoneNumber;
use Illuminate\Foundation\Http\FormRequest;

class CustomerRegisterRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'min:1', 'max:50'],
            'last_name' => ['required', 'string', 'min:1', 'max:50'],
            'email' => ['required', 'email'],
            'phone_number' => ['required', 'string', 'min:1', 'max:50', new ValidPhoneNumber('IT')],
            'date_of_birth' => ['required', 'string', 'min:1', 'max:50', new IsAdult()],
            'password' => [
                'required',
                'string',
                'min:8',
                'max:50',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[^A-Za-z0-9]/',
                'confirmed',
            ],
        ];
    }
}
