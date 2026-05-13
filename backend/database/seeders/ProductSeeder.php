<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Shop;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Get first shop or create one
        $shop = Shop::first();
        
        if ($shop) {
            Product::create([
                'shop_id' => $shop->id,
                'name' => 'Test Product',
                'price' => 10.99,
                'description' => 'This is a test product'
            ]);
        }
    }
}