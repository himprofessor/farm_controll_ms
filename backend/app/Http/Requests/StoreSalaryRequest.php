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
            'staff_id' => 'required|exists:staff,id',
            'base_salary' => 'required|numeric|min:0',
            'paid_amount' => 'nullable|numeric|min:0',
            'salary_month' => 'required|date_format:Y-m',
            'status' => 'nullable|in:paid,pending,unpaid',
            'note' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'staff_id.required' => 'The staff ID is required.',
            'staff_id.exists' => 'The specified staff member does not exist.',
            'base_salary.required' => 'The base salary is required.',
            'base_salary.numeric' => 'The base salary must be a number.',
            'base_salary.min' => 'The base salary must be at least 0.',
            'paid_amount.numeric' => 'The paid amount must be a number.',
            'paid_amount.min' => 'The paid amount must be at least 0.',
            'salary_month.required' => 'The salary month is required.',
            'salary_month.date_format' => 'The salary month must be in YYYY-MM format.',
            'status.in' => 'The status must be one of: paid, pending, unpaid.',
        ];
    }
}