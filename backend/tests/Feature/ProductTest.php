<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Shop;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_all_products()
    {
        $seller = User::factory()->create(['role' => 'seller']);
        $shop = Shop::create([
            'user_id' => $seller->id,
            'name' => 'Test Shop',
            'village' => 'Kigali',
            'phone' => '0788888888'
        ]);
        
        Product::create([
            'shop_id' => $shop->id,
            'name' => 'Test Product',
            'price' => 10.99,
        ]);
        
        $response = $this->getJson('/api/products');
        
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'products' => ['*' => ['id', 'name', 'price']],
                     'count'
                 ]);
    }

    public function test_seller_can_create_product()
    {
        $seller = User::factory()->create(['role' => 'seller']);
        Shop::create([
            'user_id' => $seller->id,
            'name' => 'Test Shop',
            'village' => 'Kigali',
            'phone' => '0788888888'
        ]);

        $response = $this->actingAs($seller, 'sanctum')->postJson('/api/products', [
            'name' => 'New Product',
            'price' => 25.99,
            'description' => 'Product description'
        ]);

        $response->assertStatus(201)
                 ->assertJson(['name' => 'New Product']);
    }

    public function test_customer_cannot_create_product()
    {
        $customer = User::factory()->create(['role' => 'customer']);

        $response = $this->actingAs($customer, 'sanctum')->postJson('/api/products', [
            'name' => 'New Product',
            'price' => 25.99
        ]);

        $response->assertStatus(403);
    }

    public function test_seller_cannot_create_product_without_shop()
    {
        $seller = User::factory()->create(['role' => 'seller']);
        // No shop created

        $response = $this->actingAs($seller, 'sanctum')->postJson('/api/products', [
            'name' => 'New Product',
            'price' => 25.99
        ]);

        $response->assertStatus(403);
    }

    public function test_seller_can_update_own_product()
    {
        $seller = User::factory()->create(['role' => 'seller']);
        $shop = Shop::create([
            'user_id' => $seller->id,
            'name' => 'Test Shop',
            'village' => 'Kigali',
            'phone' => '0788888888'
        ]);
        
        $product = Product::create([
            'shop_id' => $shop->id,
            'name' => 'Old Name',
            'price' => 10.00
        ]);

        $response = $this->actingAs($seller, 'sanctum')->putJson("/api/products/{$product->id}", [
            'name' => 'New Name'
        ]);

        $response->assertStatus(200)
                 ->assertJson(['name' => 'New Name']);
    }

    public function test_seller_cannot_update_others_product()
    {
        $seller1 = User::factory()->create(['role' => 'seller', 'phone' => '0788888881']);
        $seller2 = User::factory()->create(['role' => 'seller', 'phone' => '0788888882']);
        
        $shop1 = Shop::create([
            'user_id' => $seller1->id,
            'name' => 'Shop 1',
            'village' => 'Kigali',
            'phone' => '0788888881'
        ]);
        
        $product = Product::create([
            'shop_id' => $shop1->id,
            'name' => 'Product',
            'price' => 10.00
        ]);

        $response = $this->actingAs($seller2, 'sanctum')->putJson("/api/products/{$product->id}", [
            'name' => 'Hacked'
        ]);

        $response->assertStatus(403);
    }

    public function test_seller_can_soft_delete_own_product()
    {
        $seller = User::factory()->create(['role' => 'seller']);
        $shop = Shop::create([
            'user_id' => $seller->id,
            'name' => 'Test Shop',
            'village' => 'Kigali',
            'phone' => '0788888888'
        ]);
        
        $product = Product::create([
            'shop_id' => $shop->id,
            'name' => 'To Delete',
            'price' => 10.00
        ]);

        $response = $this->actingAs($seller, 'sanctum')->deleteJson("/api/products/{$product->id}");

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Product deleted successfully']);
        
        // Product still exists in database but with deleted_at not null
        $this->assertNotNull(Product::withTrashed()->find($product->id)->deleted_at);
    }

    public function test_deleted_product_not_shown_in_index()
    {
        $seller = User::factory()->create(['role' => 'seller']);
        $shop = Shop::create([
            'user_id' => $seller->id,
            'name' => 'Test Shop',
            'village' => 'Kigali',
            'phone' => '0788888888'
        ]);
        
        $product = Product::create([
            'shop_id' => $shop->id,
            'name' => 'To Delete',
            'price' => 10.00
        ]);

        // Delete the product
        $this->actingAs($seller, 'sanctum')->deleteJson("/api/products/{$product->id}");

        // Get all products - should not include deleted one
        $response = $this->getJson('/api/products');
        
        $response->assertJsonCount(0, 'products');
    }

    public function test_seller_can_get_their_own_products()
    {
        $seller = User::factory()->create(['role' => 'seller']);
        $shop = Shop::create([
            'user_id' => $seller->id,
            'name' => 'Test Shop',
            'village' => 'Kigali',
            'phone' => '0788888888'
        ]);
        
        Product::create([
            'shop_id' => $shop->id,
            'name' => 'Product 1',
            'price' => 10.00
        ]);
        
        Product::create([
            'shop_id' => $shop->id,
            'name' => 'Product 2',
            'price' => 20.00
        ]);

        $response = $this->actingAs($seller, 'sanctum')->getJson('/api/my-products');

        $response->assertStatus(200)
                 ->assertJsonCount(2, 'products');
    }
}