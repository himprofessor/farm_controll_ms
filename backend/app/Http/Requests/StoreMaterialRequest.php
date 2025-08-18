<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaterialRequest extends FormRequest
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
            'name' => 'required|string',
            'expires' => 'nullable|string',
            'category' => 'required|string',
            'currentStock' => 'required|integer',
            'minStock' => 'required|integer',
            'unit' => 'required|string',
            'status' => 'required|in:critical,low,ok',
            'value' => 'required|numeric',
            'pricePerUnit' => 'required|numeric',
            'supplier' => 'required|string',
            'lastUpdated' => 'required|date',
        ];
    }
}
