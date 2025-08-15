<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Borrowing extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity',
        'purpose',
        'borrowed_date',
        'retunred_date',
        'material_id',
        'staff_id',
    ];

    public function material()
    {
        return $this->belongsTo(Material::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}
