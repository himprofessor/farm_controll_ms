<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Auth extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'auth';

    protected $fillable = [
        'name',
        'password', 
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
