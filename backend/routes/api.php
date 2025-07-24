<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\SalaryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/




Route::apiResource('users', UserController::class);

Route::prefix('salaries')->group(function () {
    Route::get('/', [SalaryController::class, 'index']);
    Route::post('/', [SalaryController::class, 'store']);
    Route::put('/{id}', [SalaryController::class, 'update']);
    Route::delete('/{id}', [SalaryController::class, 'destroy']);
});




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});