<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Borrowing extends Model
{
    use HasFactory;

    public function materials(){
        return $this->belongsTo(Material::class);
    }

    protected $fillable = [
        'quantity',
        'purpose',
        'borrowed_date',
        'retunred_date',
        'material_id',
        'user_id'
    ];
}
