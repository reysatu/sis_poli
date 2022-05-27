<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login',[AuthController::class,'login']);
Route::get('/list_modulos/{id}', [AuthController::class,'list_modulos']);



Route::middleware('auth:sanctum')->group(function () {
    // Route::post('/infouser',[AuthController::class,'infouser']);
    Route::get('/logout',[AuthController::class,'logout']);
    // Route::post('/register',[AuthController::class,'register']);
    
    //Perfil
    Route::get('/perfil', [PerfilController::class,'index']);
    Route::post('/perfilC', [PerfilController::class,'store']);
    Route::put('/perfilU/{id}', [PerfilController::class,'update']);
    Route::delete('/perfilD/{id}', [PerfilController::class,'destroy']);
    ///Usuario
    Route::get('/usuario', [UserController::class,'index']);
    Route::post('/usuarioC', [UserController::class,'store']);
    Route::put('/usuarioU/{id}', [UserController::class,'update']);
    Route::delete('/usuarioD/{id}', [UserController::class,'destroy']);
    Route::get('/getPerfil', [PerfilController::class,'getPerfil']);

    
});   
