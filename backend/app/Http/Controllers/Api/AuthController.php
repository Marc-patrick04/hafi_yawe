<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:users',
            'village' => 'required|string|max:255',
            'password' => 'required|string|min:6',
            'role' => 'sometimes|in:customer,seller'
        ]);

        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'village' => $request->village,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'customer'
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }
    public function login(Request $request)
{
    $request->validate([
        'phone' => 'required|string',
        'password' => 'required|string'
    ]);

    $user = User::where('phone', $request->phone)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'phone' => ['The provided credentials are incorrect.'],
        ]);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token
    ]);
}

public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Logged out successfully'
    ]);
}

public function user(Request $request)
{
    return response()->json($request->user());
}
}