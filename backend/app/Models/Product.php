<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;  // Add this

class Product extends Model
{
    use HasFactory, SoftDeletes;  // Add SoftDeletes

    protected $fillable = [
        'shop_id',
        'name',
        'price',
        'description'
    ];

    protected $dates = ['deleted_at'];  // Add this

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}