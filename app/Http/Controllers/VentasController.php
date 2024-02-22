<?php

namespace App\Http\Controllers;

use App\Models\Detalle;
use App\Models\Precio;
use App\Models\Producto;
use App\Models\Venta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class VentasController extends Controller
{
    public function vender(Request $request)
    {

        try {
            DB::beginTransaction();
            $t = $request->venta;
            $c = $request->carrito;

            $doc = strtoupper(uniqid());

            $venta = new Venta();
            $venta->cajero_nombre = Auth::User()->nombre;
            $venta->documento = $doc;
            $venta->costos = $t["costo"];
            $venta->ganancias = $t["ganancia"];
            $venta->subtotal = $t["subtotal"];
            $venta->descuento = $t["descuento"];
            $venta->total = $t["total"];
            $venta->promociones = $t["ofertas"];
            $venta->efectivo = $t["efectivo"];
            $venta->cambio = $t["cambio"];
            $venta->articulos = $t["articulos"];
            $venta->save();




            foreach ($c as $key => $producto) {
                $id = $producto["carrito"];


                $detalle = new Detalle();
                $detalle->idventa = $venta->idventa;
                $detalle->idprecio = $producto["idprecio"];
                $detalle->idproducto = $producto["idproducto"];
                $detalle->codigo = $producto["codigo"];
                $detalle->nombre_producto = $producto["nombre"] . " " . $producto["marca"] . " " . $producto["dimension"];
                $detalle->cantidad = $producto["cantidad"];
                $detalle->precio = $producto["precio"];
                $detalle->total = $producto["cantidad"] * $producto["precio"];
                $detalle->unidades_presentacion = $producto["unidades"];
                $detalle->unidades_vendidas = $detalle->unidades_presentacion * $detalle->cantidad;
                $detalle->costo = $producto["costo"] * $producto["cantidad"];
                $detalle->ganancia = $detalle->total - $detalle->costo;
                $detalle->save();

                $precio = Precio::with("producto")->find($id);
                $producto = Producto::with("precios")->find($producto["idproducto"]);
                $unidades = $precio->cantidad;
                $cantidad = $detalle->cantidad;

                $unidadesCompradas = $unidades * $cantidad;

                $producto->existencia = $producto->existencia - $unidadesCompradas;
                $producto->save();
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response($e, 404);
        }
        return $venta;
    }
}
