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
                $detalle->nombre_producto = $producto["nombre"] . " " . $producto["marca"] . " " . $producto["dimension"] . " | ";
                $detalle->cantidad = $producto["cantidad"];
                $detalle->precio = $producto["precio"];
                $detalle->total = $producto["cantidad"] * $producto["precio"];
                $detalle->costo = $producto["costo"] * $producto["cantidad"];
                $detalle->ganancia = $detalle->total - $detalle->costo;
                $detalle->save();

                $precio = Precio::with("producto")->find($id);
                $producto = Producto::with("precios")->find($producto["idproducto"]);
                $precios = Precio::where("idprecio", $id)->orderBy("existencia", "desc")->get();

                if ($precio) {

                    /** UNIDADES VENDIDAS */
                    $unidades = $precio->cantidad * $detalle->cantidad;

                    /**SE REVISA SI LAS EXISTENCIAS ALCANZAN */
                    if ($precio->existencia >= $detalle->cantidad) {
                        //Si alcanzan entonces hace un procedimiento simple
                        $restante = $precio->existencia - $detalle->cantidad;
                        $precio->existencia = $restante;
                        $precio->save();
                    } else {

                        $unidades = $precio->cantidad;
                        $cantidad = $detalle->cantidad;

                        $unidadesCompradas = $unidades * $cantidad;
                        $intentos = 0;
                        $restante = 0;

                        while ($unidadesCompradas > 0) {
                            foreach ($precios as $key => $p) {
                                if ($p->existencia && $unidadesCompradas > 0) {
                                    $unidadesPresentacion = $p->cantidad;
                                    if ($unidadesCompradas > $unidadesPresentacion && $unidadesCompradas / $unidadesPresentacion >= 1) {
                                        $restante = $unidadesCompradas % $unidadesPresentacion;
                                        $presentacionesRequeridas = ($unidadesCompradas - $restante) / $unidadesPresentacion;
                                    } else {
                                        $restante = $unidadesPresentacion - $unidadesCompradas;
                                        $presentacionesRequeridas = round($unidadesCompradas / $unidadesPresentacion, 0);
                                    }
                                    if ($p->existencia > $presentacionesRequeridas) {
                                        $precioUtilizado = Precio::find($p->idprecio);
                                        $precioUtilizado->existencia = $precioUtilizado->existencia - $presentacionesRequeridas;
                                        $precioUtilizado->save();
                                        $unidadesCompradas = 0;
                                    }
                                    if ($p->existencia < $presentacionesRequeridas) {
                                        $presentacionesActuales = $p->existencias;
                                        $faltantes = $presentacionesRequeridas - $presentacionesActuales;

                                        $precioUtilizado = Precio::find($p->idprecio);
                                        $precioUtilizado->existencia = $precioUtilizado->existencia - $presentacionesActuales;
                                        $precioUtilizado->save();
                                        $unidadesCompradas = $faltantes * $unidadesPresentacion;
                                    }
                                }
                            }
                            $intentos++;
                        }


                        $precioUnidad = Precio::where("cantidad", 1)->where("idproducto", $producto->idproducto)->first();
                        if ($precioUnidad) {
                            $precioUnidad->existencia = $precioUnidad->existencia + $restante;
                            $precioUnidad->save();
                        }
                    }

                    $producto->unidades_vendidas = $producto->unidades_vendidas + $unidades;
                    $producto->save();
                }




                //foreach ($producto["descuentos"] as $key => $descuento) {
                //    $detalle = new Detalle();
                //    $detalle->idventa = $venta->idventa;
                //    $detalle->codigo = "desq";
                //    $detalle->nombre_producto = "Descuento " . $descuento["texto"] . " " . $producto["nombre"];
                //    $detalle->cantidad = $descuento["cantidad"];
                //    $detalle->precio = (- ($descuento["descuento"]));
                //    $detalle->total = $detalle->cantidad * $detalle->precio;
                //    $detalle->save();
                //}
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response($e, 404);
        }
        return $venta;
    }
}
