<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Shop;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShopTest extends TestCase
{
    use RefreshDatabase;

    public function test_seller_can_create_shop()
    {
        $seller = User::factory()->create([
            'role' => 'seller',
            'phone' => '0788888888'
        ]);

        $response = $this->actingAs($seller, 'sanctum')->postJson('/api/shops', [
            'name' => 'My Shop',
            'village' => 'Kigali',
            'phone' => '0788888888',
            'description' => 'This is my shop'
        ]);

        $response->assertStatus(201)
                 ->assertJson(['name' => 'My Shop']);
    }

    public function test_seller_cannot_create_two_shops()
    {
        $seller = User::factory()->create([
            'role' => 'seller',
            'phone' => '0788888888'
        ]);

        // Create first shop
        $this->actingAs($seller, 'sanctum')->postJson('/api/shops', [
            'name' => 'First Shop',
            'village' => 'Kigali',
            'phone' => '0788888888'
        ]);

        // Try to create second shop
        $response = $this->actingAs($seller, 'sanctum')->postJson('/api/shops', [
            'name' => 'Second Shop',
            'village' => 'Kigali',
            'phone' => '0788888888'
        ]);

        $response->assertStatus(422);
    }

    public function test_customer_cannot_create_shop()
    {
        $customer = User::factory()->create([
            'role' => 'customer',
            'phone' => '0788888888'
        ]);

        $response = $this->actingAs($customer, 'sanctum')->postJson('/api/shops', [
            'name' => 'My Shop',
            'village' => 'Kigali',
            'phone' => '0788888888'
        ]);

        $response->assertStatus(403);
    }

    public function test_seller_can_update_own_shop()
    {
        $seller = User::factory()->create([
            'role' => 'seller',
            'phone' => '0788888888'
        ]);

        $shop = Shop::create([
            'user_id' => $seller->id,
            'name' => 'Old Name',
            'village' => 'Kigali',
            'phone' => '0788888888'
        ]);

        $response = $this->actingAs($seller, 'sanctum')->putJson("/api/shops/{$shop->id}", [
            'name' => 'New Name'
        ]);

        $response->assertStatus(200)
                 ->assertJson(['name' => 'New Name']);
    }

    public function test_seller_cannot_update_others_shop()
    {
        $seller1 = User::factory()->create([
            'role' => 'seller',
            'phone' => '0788888881'
        ]);

        $seller2 = User::factory()->create([
            'role' => 'seller',
            'phone' => '0788888882'
        ]);

        $shop = Shop::create([
            'user_id' => $seller1->id,
            'name' => 'Seller1 Shop',
            'village' => 'Kigali',
            'phone' => '0788888881'
        ]);

        $response = $this->actingAs($seller2, 'sanctum')->putJson("/api/shops/{$shop->id}", [
            'name' => 'Hacked'
        ]);

        $response->assertStatus(403);
    }
    public function test_customer_cannot_access_seller_routes()
{
    $customer = User::factory()->create([
        'role' => 'customer',
        'phone' => '0788888888'
    ]);

    // Try to create shop
    $createResponse = $this->actingAs($customer, 'sanctum')->postJson('/api/shops', [
        'name' => 'My Shop',
        'village' => 'Kigali',
        'phone' => '0788888888'
    ]);
    $createResponse->assertStatus(403);

    // Create a shop first (as seller)
    $seller = User::factory()->create([
        'role' => 'seller',
        'phone' => '0789999999'
    ]);
    
    $shop = \App\Models\Shop::create([
        'user_id' => $seller->id,
        'name' => 'Test Shop',
        'village' => 'Kigali',
        'phone' => '0789999999'
    ]);

    // Try to update shop as customer
    $updateResponse = $this->actingAs($customer, 'sanctum')->putJson("/api/shops/{$shop->id}", [
        'name' => 'Hacked Name'
    ]);
    $updateResponse->assertStatus(403);

    // Try to get my-shop as customer
    $myShopResponse = $this->actingAs($customer, 'sanctum')->getJson('/api/my-shop');
    $myShopResponse->assertStatus(403);
}
}