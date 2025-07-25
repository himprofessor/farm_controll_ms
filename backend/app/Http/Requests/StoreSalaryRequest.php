<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSalaryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'base_salary' => 'required|numeric|min:0',
            'salary_month' => ['required', 'regex:/^\d{4}-(0[1-9]|1[0-2])$/'],
            'status' => 'in:paid,unpaid,pending',
            'paid_amount' => 'nullable|numeric|min:0',
            'note' => 'nullable|string|max:1000',
        ];
    }
}
