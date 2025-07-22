<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplire extends Model
{
    use HasFactory;
    
    public function material_purchases(){
        return $this->hasMany(MaterialPurchase::class);
    }

    protected $fillable = [
        'name',
        'context_info'
    ];
}
