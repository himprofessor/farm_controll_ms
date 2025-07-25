<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipmentMaintenanceRequest extends FormRequest
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
            'maintenance_date' => 'required|date',
            'description' => 'required|string',
            'cost' => 'required|numeric|min:0',
            'performed_by' => 'required|string|max:255',
            'equipment_id' => 'required|exists:equipment,id'
        ];
    }
}
