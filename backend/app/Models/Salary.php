<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Salary extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_id', // Changed from user_id
        'base_salary',
        'current_balance',
        'total_Earned',
        'last_payment_date'
    

    ];

    public function staff(): BelongsTo // Changed from user
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }
}