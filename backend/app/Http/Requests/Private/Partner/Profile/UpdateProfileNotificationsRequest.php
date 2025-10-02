<?php

declare(strict_types=1);

namespace App\Http\Requests\Private\Partner\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileNotificationsRequest extends FormRequest
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
            'new_order' => ['required', 'boolean'],
            'new_review' => ['required', 'boolean'],
        ];
    }
}
