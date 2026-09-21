<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChildController;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\ContractController;
use App\Services\PayrollService;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);

    Route::apiResource('/me/children', ChildController::class)->only(['index','store','update','destroy']);
    Route::apiResource('/me/planning', PlanningController::class)->only(['index','store','update','destroy']);
    Route::apiResource('/me/contracts', ContractController::class)->only(['index','store', 'update','destroy']);
    Route::apiResource('/me/employers', EmployerController::class)->only(['index','store','update','destroy']);
    
    Route::get('/me/payroll', [PayrollService::class, 'index']);
    Route::post('/me/payroll', [PayrollService::class, 'generate']);
    Route::post('/me/payroll/export', [PayrollService::class, 'export']);
});
