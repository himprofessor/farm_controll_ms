<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'base_salary',
        'salary_month',
        'status',
        'paid_amount',
        'note',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
