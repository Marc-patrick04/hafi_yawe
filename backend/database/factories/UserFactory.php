<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'phone' => fake()->unique()->numerify('078#######'),
            'village' => fake()->city(),
            'password' => static::$password ??= Hash::make('password'),
            'role' => 'customer',
        ];
    }
}