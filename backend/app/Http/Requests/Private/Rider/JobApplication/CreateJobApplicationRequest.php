<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Rider\JobApplication;

use App\Rules\ValidPhoneNumber;
use Illuminate\Foundation\Http\FormRequest;

class CreateJobApplicationRequest extends FormRequest
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
            'phone_number' => ['required', 'string', 'min:1', new ValidPhoneNumber('IT')],
            'resume' => ['required', 'file', 'mimes:pdf', 'max:2048'],
            'declaration_accepted_at' => ['required', 'accepted'],
        ];
    }
}
