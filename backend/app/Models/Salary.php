<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;
<<<<<<< HEAD
    protected $fillable = [
        'user_id',
        'amount',
        'payment_date',
        'status',
        'remarks',
=======

    public function users(){
        return $this->belongsTo(User::class);
    }

    protected $fillable = [
        'user_id',
        'base_salary',
        'salary_month',
        'status',
        'paid_amount',
        'note'
>>>>>>> development
    ];
}
