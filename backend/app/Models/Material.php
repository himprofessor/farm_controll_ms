<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    public function material_purchases(){
        return $this->hasMany(MaterialPurchase::class);
    }
    public function borrowings(){
        return $this->hasMany(Borrowing::class);
    }

    protected $fillable = [
        'name',
        'unit',
        'quantity',
        'reorder_level'
    ];
}
