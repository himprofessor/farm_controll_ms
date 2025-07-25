<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Withdrawal extends Model
{
    use HasFactory;

    public function users(){
        return $this->belongsTo(User::class);
    }
    public function approver()
{
    return $this->belongsTo(User::class, 'approved_by');
}

    protected $fillable = [
        'user_id',
        'amount',
        'request_date',
        'approval_status',
        'approved_by',
        'approved_at',
        'notes'
    ];
}
