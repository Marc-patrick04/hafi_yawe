<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ShopController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'message' => 'API is running']);
});

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public product routes (anyone can view products)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Protected routes (require token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Shop routes
    Route::post('/shops', [ShopController::class, 'store'])
         ->middleware('role:seller');
    Route::get('/shops/{id}', [ShopController::class, 'show']);
    Route::put('/shops/{id}', [ShopController::class, 'update'])
         ->middleware('role:seller');
    Route::get('/my-shop', [ShopController::class, 'myShop'])
         ->middleware('role:seller');
    
    // Product routes (only create/update/delete require seller)
    Route::post('/products', [ProductController::class, 'store'])
         ->middleware('role:seller');
    Route::put('/products/{id}', [ProductController::class, 'update'])
         ->middleware('role:seller');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])
         ->middleware('role:seller');
         Route::get('/my-products', [ProductController::class, 'myProducts'])
     ->middleware('role:seller');
});