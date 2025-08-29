<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Withdrawal extends Model
{
    use HasFactory;

    public function staff(){
        return $this->belongsTo(Staff::class);
    }

    protected $fillable = [
        'staff_id',
        'amount',
        'request_date',
        'status',
        'reason'
    ];
}
