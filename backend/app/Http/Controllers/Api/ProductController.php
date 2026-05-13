<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;  // Add this

class ProductController extends Controller
{
    // Index - Get all products (including soft deleted? no, only active)
    public function index()
    {
        $products = Product::with('shop')->latest()->get();
        
        return response()->json([
            'products' => $products,
            'count' => $products->count()
        ]);
    }

    // Store - Create new product
    public function store(Request $request)
    {
        // Check policy
        if (Gate::denies('create', Product::class)) {
            return response()->json([
                'message' => 'You need to create a shop first before adding products'
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string'
        ]);

        $shop = $request->user()->shop;

        $product = Product::create([
            'shop_id' => $shop->id,
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description
        ]);

        return response()->json($product, 201);
    }

    // Show - Get single product
    public function show($id)
    {
        $product = Product::with('shop')->findOrFail($id);
        
        // Anyone can view (policy returns true)
        return response()->json($product);
    }

    // Update - Update product
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        // Check policy
        if (Gate::denies('update', $product)) {
            return response()->json(['message' => 'Unauthorized - You do not own this product'], 403);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'description' => 'nullable|string'
        ]);

        $product->update($request->only(['name', 'price', 'description']));

        return response()->json($product);
    }

    // Destroy - Soft delete product
    public function destroy(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        // Check policy
        if (Gate::denies('delete', $product)) {
            return response()->json(['message' => 'Unauthorized - You do not own this product'], 403);
        }

        $product->delete();  // Soft delete (uses deleted_at)

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
    // Get products for the authenticated seller's shop
public function myProducts(Request $request)
{
    $shop = $request->user()->shop;
    
    if (!$shop) {
        return response()->json(['products' => [], 'count' => 0]);
    }
    
    $products = Product::where('shop_id', $shop->id)
        ->latest()
        ->get();
    
    return response()->json([
        'products' => $products,
        'count' => $products->count()
    ]);
}
}