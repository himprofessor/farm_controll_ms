<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialPurchase extends Model
{
    use HasFactory;

    public function materials(){
        return $this->belongsTo(Material::class);
    }
    public function supplires(){
        return $this->belongsTo(Supplire::class);
    }


    protected $fillable = [
        'quantity',
        'price_per_unit',
        'total_cost',
        'purchase_date',
        'material_id',
        'supplire_id'
    ];
}
