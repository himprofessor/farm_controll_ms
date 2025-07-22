<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Withdrawal extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'amount',
        'request_date',
        'approved_status',
        'approved_by',
        'approved_at',
        'notes',

    ];
}
