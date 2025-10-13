<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Customer\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAddressInfoRequest extends FormRequest
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
            'street_address' => ['required', 'string', 'min:1', 'max:50'],
            'building_number' => ['required', 'string', 'min:1', 'max:50'],
            'postcode' => ['required', 'string', 'min:1', 'max:50'],
            'city' => ['required', 'string', 'min:1', 'max:50'],
            'state' => ['required', 'string', 'min:1', 'max:50'],
        ];
    }
}
