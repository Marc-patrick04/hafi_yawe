<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;  
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;  
    protected $fillable = [
        'name',
        'phone',
        'village',
        'password',
        'role',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'password' => 'hashed',
    ];
    public function shop()
{
    return $this->hasOne(Shop::class);
}
}
