<?php

namespace App\Http\Controllers;

use Excel;
use DB;
use App\Models\Producto;
use App\Models\Precio;
use App\Imports\ImportarProductos as Import;
use Illuminate\Http\Request;

class ImportacionesController extends Controller
{
    public function importarProductos(Request $request)
    {

        $import = new Import;
        Excel::import($import, $request->file('archivo'));
        return $import->data;
    }
    public function guardarRegistros(Request $request)
    {
        $productos = $request->importado;
        try {
            DB::beginTransaction();
            foreach ($productos as $key => $presentaciones) {
                /**
                 * CODIGO
                 */

                $producto = new Producto();
                $producto->codigo = $presentaciones[0][1];
                $producto->nombre = $presentaciones[0][2];
                $producto->marca = $presentaciones[0][3];
                $producto->dimension = $presentaciones[0][4];
                $producto->detalles = $presentaciones[0][5];
                $producto->save();
                $existencia = 0;
                $costo_base = 0;
                $costo_unitario = 0;
                foreach ($presentaciones as $key => $p) {
                    $costo = $p[8];
                    $cantidad = $p[7];
                    if ($costo) {
                        $costo_base = $costo / $cantidad;
                    }
                }

                foreach ($presentaciones as $key => $p) {
                    $nombre = $p[6];
                    $cantidad = $p[7];
                    $costo = $p[8];
                    $nuevo_costo = $costo_base * $cantidad;
                    $precio_unitario = $p[9];
                    $precio_presentacion = $p[10];
                    $precio_final = ($precio_unitario) ? $precio_unitario * $cantidad : $precio_presentacion;


                    $precio = new Precio();
                    $precio->idproducto = $producto->idproducto;
                    $precio->cantidad = $cantidad;
                    $precio->precio = $precio_final;
                    $precio->nombre = $nombre;
                    $precio->costo = $costo ? $costo : $nuevo_costo;

                    $producto->precios()->save($precio);
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response("error: " . $e->getMessage(), 404);
        }
    }
}
