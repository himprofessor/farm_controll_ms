<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;


    public function borrowings(){
        return $this->hasMany(Borrowing::class);
    }
    public function sales(){
        return $this->hasMany(Sale::class);
    }

     protected $fillable = [
        'name', 'expires', 'category', 'currentStock', 'minStock',
        'unit', 'status', 'value', 'pricePerUnit', 'supplier', 'lastUpdated',
    ];
}
