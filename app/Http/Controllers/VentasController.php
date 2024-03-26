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
            $v = $request->venta;
            $carrito = $request->carrito;

            $doc = strtoupper(uniqid());

            $venta = new Venta();
            $venta->cajero_nombre = Auth::User()->nombre;
            $venta->documento = $doc;
            $venta->idturno = $v["idturno"];
            $venta->costos = $v["costo"];
            $venta->ganancias = $v["ganancia"];
            $venta->subtotal = $v["subtotal"];
            $venta->descuento = $v["descuento"];
            $venta->total = $v["total"];
            $venta->promociones = $v["ofertas"];
            $venta->efectivo = $v["efectivo"];
            $venta->cambio = $v["cambio"];
            $venta->articulos = $v["articulos"];
            $venta->save();




            foreach ($carrito as $key => $precio) {
                $id = $precio["idprecio"];

                $detalle = new Detalle();
                $detalle->idventa = $venta->idventa;
                $detalle->idprecio = $precio["idprecio"];
                $detalle->idproducto = $precio["idproducto"];
                $detalle->codigo = $precio["producto"]["codigo"];
                $detalle->nombre_producto = $precio["producto"]["nombre"] . " " . $precio["producto"]["marca"] . " " . $precio["producto"]["dimension"];
                $detalle->presentacion = $precio["nombre"];
                $detalle->cantidad = $precio["carrito"];
                $detalle->precio = $precio["precio"];
                $detalle->total = $precio["carrito"] * $precio["precio"];
                $detalle->unidades_presentacion = $precio["cantidad"];
                $detalle->unidades_vendidas = $detalle->unidades_presentacion * $detalle->cantidad;
                $detalle->costo = $precio["costo"] * $precio["carrito"];
                $detalle->ganancia = $detalle->total - $detalle->costo;
                $detalle->save();

                $precio = Precio::with("producto")->find($id);
                $producto = Producto::with("precios")->find($precio["idproducto"]);
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
    public function anular(Request $request, $idventa)
    {
        $venta = Venta::with("detalles")->find($idventa);

        if (!$venta) {
            return response("No se ha encontrado la venta", 404);
        }
        if ($venta->anulado) {
            return response("la venta ya ha sido anulada", 404);
        }

        $detalles = Detalle::where("idventa", $venta->idventa)->get();
        foreach ($detalles as $key => $detalle) {
            $producto = Producto::find($detalle->idproducto);
            if ($producto) {
                $producto->existencia = $producto->existencia + $detalle->unidades_vendidas;
                $producto->save();
            }
        }
        $venta->anulado = 1;
        $venta->save();
        return $venta;
    }
}
