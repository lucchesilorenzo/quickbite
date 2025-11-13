<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Rider\Auth;

use App\Enums\VehicleType;
use App\Rules\ValidPhoneNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
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
            'email' => ['required', 'email', 'unique:users,email'],
            'phone_number' => [
                'required',
                'string',
                'max:50',
                new ValidPhoneNumber('IT'),
                'unique:users,phone_number',
            ],
            'street_address' => ['required', 'string', 'max:50'],
            'building_number' => ['required', 'string', 'max:50'],
            'postcode' => ['required', 'string', 'max:50'],
            'city' => ['required', 'string', 'max:50'],
            'state' => ['required', 'string', 'max:50'],
            'vehicle_type' => ['required', Rule::enum(VehicleType::class)],
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
