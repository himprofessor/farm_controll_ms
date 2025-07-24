<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBorrowingRequest extends FormRequest
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
            'quantity' => 'required|integer|min:1',
            'purpose' => 'required|string|max:1000',
            'borrowed_date' => 'required|date',
            'returned_date' => 'nullable|date|after_or_equal:borrowed_date',
            'material_id' => 'required|exists:materials,id',
            'user_id' => 'required|exists:users,id',
        ];
    }
}
