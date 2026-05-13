<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Product;

class ProductPolicy
{
    // Check if user can update the product
    public function update(User $user, Product $product)
    {
        return $product->shop->user_id === $user->id;
    }

    // Check if user can delete the product
    public function delete(User $user, Product $product)
    {
        return $product->shop->user_id === $user->id;
    }

    // Check if user can view the product
    public function view(User $user, Product $product)
    {
        return true; // Anyone can view products
    }

    // Check if user can create products
    public function create(User $user)
    {
        // User must have a shop
        return $user->shop !== null;
    }
}