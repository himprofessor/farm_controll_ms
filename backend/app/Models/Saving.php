<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Saving extends Model
{
    use HasFactory;

    public function users(){
        return $this->belongsTo(User::class);
    }

    protected $fillable = [
        'user_id',
        'amount_saved',
        'date_saved',
        'remarks'
    ];

}
