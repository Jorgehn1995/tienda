<?php

use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\ClientesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/login', [LoginController::class, 'login'])->name('api.login');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});





Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/logout', 'api\LoginController@logout')->name('api.v3.logout');

    /**
     * CLIENTES
     */
    Route::get('/clientes', [ClientesController::class, 'index'])->name('api.clientes.index');
    Route::get('/clientes/{idcliente}', [ClientesController::class, 'ver'])->name('api.clientes.ver');
    Route::post('/clientes', [ClientesController::class, 'crear'])->name('api.clientes.crear');
    Route::put('/clientes/{idcliente}', [ClientesController::class, 'editar'])->name('api.clientes.editar');
    Route::delete('/clientes/{idcliente}', [ClientesController::class, 'eliminar'])->name('api.clientes.eliminar');
});
