<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;
     protected $fillable = [
        'product_name',
        'quantity',
        'unit_price',
        'total_price',
        'description',
        'sale_date',
        'material_id',
    ];

    /**
     * Relationship: A sale belongs to a material
     */
    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}
