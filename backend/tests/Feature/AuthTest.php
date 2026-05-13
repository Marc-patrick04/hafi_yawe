<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'phone' => '0788888888',
            'village' => 'Kigali',
            'password' => 'password123'
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['user', 'token']);
    }

    public function test_user_can_login()
    {
        // Create user first
        $user = User::create([
            'name' => 'Test User',
            'phone' => '0789999999',  // Different phone
            'village' => 'Kigali',
            'password' => bcrypt('password123')
        ]);

        $response = $this->postJson('/api/login', [
            'phone' => '0789999999',
            'password' => 'password123'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['user', 'token']);
    }
}