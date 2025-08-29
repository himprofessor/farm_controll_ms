<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSalaryRequest extends FormRequest
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
             'staff_id' => 'required|exists:staff,id',
            'base_salary' => 'required|numeric|min:0',
            'current_balance' => 'nullable|numeric|min:0',
            'total_earned' => 'nullable|numeric|min:0',
            'last_payment_date' => 'nullable|date',
        ];
    }
}
