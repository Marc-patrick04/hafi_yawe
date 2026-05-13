<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'village',
        'phone',
        'description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Comment out until Product model exists (Day 6)
    // public function products()
    // {
    //     return $this->hasMany(Product::class);
    // }
    public function products()
{
    return $this->hasMany(Product::class);
}
}