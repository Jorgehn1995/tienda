<?php

use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\ClientesController;
use App\Http\Controllers\ImpresionesController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\ReportesController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\VentasController;
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
Route::get('/imprimir', [ImpresionesController::class, 'imprimir'])->name('api.productos.index');
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

    /**
     * USUARIOS
     */
    Route::get('/usuarios', [UsuariosController::class, 'index'])->name('api.usuarios.index');
    Route::get('/usuarios/{idusuario}', [UsuariosController::class, 'ver'])->name('api.usuarios.ver');
    Route::post('/usuarios', [UsuariosController::class, 'crear'])->name('api.usuarios.crear');
    Route::put('/usuarios/{idusuario}', [UsuariosController::class, 'editar'])->name('api.usuarios.editar');
    Route::delete('/usuarios/{idusuario}', [UsuariosController::class, 'eliminar'])->name('api.usuarios.eliminar');

    /**
     * Productos
     */
    Route::get('/productos', [ProductosController::class, 'index'])->name('api.productos.index');
    Route::get('/productos/{codigo}', [ProductosController::class, 'ver'])->name('api.productos.ver');
    Route::post('/productos', [ProductosController::class, 'crear'])->name('api.productos.crear');
    Route::put('/productos/{codigo}', [ProductosController::class, 'editar'])->name('api.productos.editar');
    Route::delete('/productos/{codigo}', [ProductosController::class, 'eliminar'])->name('api.productos.eliminar');

    /**
     * Precios
     */
    Route::post('/impresiones/precios', [ImpresionesController::class, 'precio'])->name('api.impresiones.precios');
    Route::post('/impresiones/barcode', [ImpresionesController::class, 'barcode'])->name('api.impresiones.barcode');
    Route::post('/impresiones/recibos/{doc}', [ImpresionesController::class, 'recibo'])->name('api.impresiones.recibos');


    /**
     * VENTA
     */
    Route::post('/ventas/vender', [VentasController::class, 'vender'])->name('api.ventas.vender');

    /**
     * CONSULTA
     */
    Route::get('/reporte/{inicio}/{fin}', [ReportesController::class, 'index'])->name('api.ventas.vender');

});
