<?php

namespace App\Http\Controllers;

use App\Models\Detalle;
use App\Models\Producto;
use App\Models\Venta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VentasController extends Controller
{
    public function vender(Request $request)
    {


        $t = $request->venta;
        $c = $request->carrito;

        $doc = uniqid();

        $venta = new Venta();
        $venta->cajero_nombre = Auth::User()->nombre;
        $venta->documento = $doc;
        $venta->costos = $t["costo"];
        $venta->ganancias = $t["ganancia"];
        $venta->subtotal = $t["subtotal"];
        $venta->descuento = $t["descuento"];
        $venta->total = $t["total"];
        $venta->promociones = $t["ofertas"];
        $venta->efectivo=$t["efectivo"];
        $venta->cambio=$t["cambio"];
        $venta->save();

        foreach ($c as $key => $producto) {
            $id = $producto["producto"]["idproducto"];
            $p = Producto::find($id);

            $detalle = new Detalle();
            $detalle->idventa=$venta->idventa;
            $detalle->codigo=$producto["producto"]["codigo"];
            $detalle->nombre_producto = $producto["nombre"];
            $detalle->cantidad = $producto["cantidad"];
            $detalle->precio = $producto["precio"];
            $detalle->total = $producto["cantidad"] * $producto["precio"];
            $detalle->costo = $producto["producto"]["costo"] * $producto["cantidad"];
            $detalle->ganancia = $detalle->total - $detalle->costo;

            if ($p) {
                $detalle->idproducto = $p->idproducto;
                $restantes = $p->existencia - $detalle->cantidad;
                if ($restantes < 0) {
                    $p->existencia = 0;
                } else {
                    $p->existencia = $restantes;
                }

                $p->save();
            }
            $detalle->save();


            foreach ($producto["descuentos"] as $key => $descuento) {
                $detalle=new Detalle();
                $detalle->idventa=$venta->idventa;
                $detalle->codigo="desq";
                $detalle->nombre_producto=$descuento["texto"]." ".$producto["nombre"]." - limite ".$descuento["limite"];
                $detalle->cantidad=$descuento["cantidad"];
                $detalle->precio=$descuento["descuento"];
                $detalle->total=$descuento["cantidad"]*$descuento["descuento"];
                $detalle->save();
            }

        }
        return $venta;
    }
}
