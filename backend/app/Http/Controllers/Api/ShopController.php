<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ShopController extends Controller
{
    // Store - Create shop (seller only)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'village' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'description' => 'nullable|string'
        ]);

        // Check if seller already has a shop
        $existingShop = Shop::where('user_id', $request->user()->id)->first();
        if ($existingShop) {
            throw ValidationException::withMessages([
                'shop' => ['You already have a shop. Each seller can only have one shop.']
            ]);
        }

        $shop = Shop::create([
            'user_id' => $request->user()->id,
            'name' => $request->name,
            'village' => $request->village,
            'phone' => $request->phone,
            'description' => $request->description
        ]);

        return response()->json($shop, 201);
    }

    // Show - Get single shop
    public function show($id)
    {
        $shop = Shop::with('user')->findOrFail($id);
        return response()->json($shop);
    }

    // Update - Update shop (owner only)
    public function update(Request $request, $id)
    {
        $shop = Shop::findOrFail($id);

        // Check if user owns this shop
        if ($shop->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'village' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
            'description' => 'nullable|string'
        ]);

        $shop->update($request->only(['name', 'village', 'phone', 'description']));

        return response()->json($shop);
    }

    // Get seller's own shop
    public function myShop(Request $request)
    {
        $shop = Shop::where('user_id', $request->user()->id)->first();
        
        if (!$shop) {
            return response()->json(['message' => 'No shop found'], 404);
        }
        
        return response()->json($shop);
    }
}