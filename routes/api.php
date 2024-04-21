<?php

use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\CajasController;
use App\Http\Controllers\ClientesController;
use App\Http\Controllers\ImportacionesController;
use App\Http\Controllers\ImpresionesController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\PresentacionesController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\ReportesController;
use App\Http\Controllers\TurnosController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\VencimientosController;
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
    Route::get('/productos/{idproducto}/ventas/{group}/{inicio}/{fin}', [ProductosController::class, 'ventas'])->name('api.productos.leer');
    Route::get('/productos/{idproducto}', [ProductosController::class, 'ver'])->name('api.productos.ver');
    Route::post('/productos', [ProductosController::class, 'crear'])->name('api.productos.crear');
    Route::put('/productos/{idproducto}', [ProductosController::class, 'editar'])->name('api.productos.editar');
    Route::delete('/productos/{idproducto}', [ProductosController::class, 'eliminar'])->name('api.productos.eliminar');
    //Route::get('/productos/id/{idproducto}', [ProductosController::class, 'leer'])->name('api.productos.leer');
    //Route::get('/productos/detalles/{idproducto}/{group}/{inicio}/{fin}', [ProductosController::class, 'detalles'])->name('api.productos.leer');


    /**
     * DETALLES
     */




    Route::put('/productos/{codigo}', [ProductosController::class, 'editar'])->name('api.productos.editar');


    /**
     * Presentaciones
     */
    Route::get('/presentaciones', [PresentacionesController::class, 'index'])->name('api.presentaciones.index');

    /**
     * VENCIMIENTOS
     */
    Route::get('/vencimientos', [VencimientosController::class, 'index'])->name('api.vencimientos.index');
    Route::post('/vencimientos', [VencimientosController::class, 'revisar'])->name('api.vencimientos.index');

    /**
     * CAJAS
     */
    Route::get('/cajas', [CajasController::class, 'index'])->name('api.presentaciones.index');
    Route::get('/cajas/verificar/{codigo}', [CajasController::class, 'verificar'])->name('api.presentaciones.index');
    Route::get('/cajas/estado/{idcaja}', [CajasController::class, 'cambiarEstado'])->name('api.presentaciones.index');
    //Route::get('/cajas/{id}', [CajasController::class, 'ver'])->name('api.cajas.ver');
    Route::post('/cajas', [CajasController::class, 'crear'])->name('api.cajas.crear');
    //Route::get('/cajas/ventas/{codigo}', [CajasController::class, 'ventas'])->name('api.cajas.ver');
    //Route::get('/cajas/disponibles/{codigo}', [CajasController::class, 'disponibles'])->name('api.cajas.ver');


    /**
     * TURNOS
     */
    Route::get('/turnos', [TurnosController::class, 'index'])->name('api.impresiones.abrir');
    Route::get('/turnos/{idturno}', [TurnosController::class, 'ver'])->name('api.impresiones.abrir');
    Route::get('/turnos/{idturno}/ventas', [TurnosController::class, 'ventas'])->name('api.impresiones.abrir');
    Route::get('/cajas/{idcaja}/turnos-disponibles', [TurnosController::class, 'disponibles'])->name('api.impresiones.abrir');
    Route::post('/turnos', [TurnosController::class, 'crear'])->name('api.impresiones.abrir');
    Route::delete('/turnos/{idturno}', [TurnosController::class, 'cerrar'])->name('api.impresiones.abrir');
    /**
     * Precios
     */
    Route::post('/impresiones/precios', [ImpresionesController::class, 'precio'])->name('api.impresiones.precios');
    Route::post('/impresiones/barcode', [ImpresionesController::class, 'barcode'])->name('api.impresiones.barcode');
    Route::post('/impresiones/recibos/{doc}', [ImpresionesController::class, 'recibo'])->name('api.impresiones.recibos');
    Route::get('/impresiones/recibos/abrir', [ImpresionesController::class, 'abrir'])->name('api.impresiones.abrir');
    Route::post('/impresiones/reporte/total', [ImpresionesController::class, 'reporte_total'])->name('api.impresiones.reporte.total');


    /**
     * VENTA
     */
    Route::post('/ventas/{idventa}/recibo', [PDFController::class, 'recibo'])->name('api.ventas.vender');
    Route::post('/ventas/vender', [VentasController::class, 'vender'])->name('api.ventas.vender');
    Route::delete('/venta/{idventa}/anular', [VentasController::class, 'anular'])->name('api.ventas.vender');

    /**
     * VENTAS
     */


    /**
     * CONSULTA
     */
    Route::get('/reporte/{inicio}/{fin}', [ReportesController::class, 'index'])->name('api.ventas.vender');


    /**
     * IMPORTA4R PRODUCTOS
     */
    Route::post('/excel/importar', [ImportacionesController::class, 'importarProductos'])->name('api.ventas.vender');
    Route::post('/excel/guardar', [ImportacionesController::class, 'guardarRegistros'])->name('api.ventas.vender');
});
