<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Withdrawal extends Model
{
    use HasFactory;
<<<<<<< HEAD
=======

    public function users(){
        return $this->belongsTo(User::class);
    }

>>>>>>> development
    protected $fillable = [
        'user_id',
        'amount',
        'request_date',
<<<<<<< HEAD
        'approved_status',
        'approved_by',
        'approved_at',
        'notes',

=======
        'approval_status',
        'approved_by',
        'approved_at',
        'notes'
>>>>>>> development
    ];
}
