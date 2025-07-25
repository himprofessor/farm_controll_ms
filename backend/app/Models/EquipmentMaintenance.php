<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentMaintenance extends Model
{
    use HasFactory;

    public function equipments(){
        return $this->belongsTo(Equipment::class);
    }

    protected $fillable = [
        'maintenance_date',
        'description',
        'cost',
        'performed_by',
        'material_id'
    ];
}
