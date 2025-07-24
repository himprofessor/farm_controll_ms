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
            'user_id'      => 'required|exists:users,id',
            'base_salary'  => 'required|numeric|min:0',
            'salary_month' => 'required|date_format:Y-m',
            'status'       => 'required|in:paid,unpaid,pending',
            'paid_amount'  => 'required|numeric|min:0',
            'note'         => 'nullable|string|max:255',
        ];
    }
}
