<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentMaintenance extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'maintenance_date',
        'description',
        'cost',
        'performed_by',
        'status'
    ];
}
