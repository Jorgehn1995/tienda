<?php

namespace App\Http\Controllers;

use App\Models\Precio;
use App\Models\Producto;
use Illuminate\Http\Request;

class RevisionesController extends Controller
{
    public function productos()
    {
        $productos = Producto::get();
        $cPrecios = 0;
        $cCostos = 0;
        foreach ($productos as $key => $producto) {
            $precio = Precio::where("idproducto", $producto->idproducto)->where("nombre", "Unidad")->first();
            if (!$precio) {
                $precio = new Precio();
                $precio->idproducto = $producto->idproducto;
                $precio->nombre = "Unidad";
                $precio->cantidad = 1;
                $precio->costo = $producto->costo;
                $precio->precio = $producto->precio;
                $producto->precios()->save($precio);
                $cPrecios++;
            }
            $costo = null;
            if ($precio->costo) {
                $costo = $precio->costo;
            }
            /**
             * ESTABLECER COSTOS
             */
            $precios = Precio::whereNull("costo")->where("idproducto", $producto->idproducto)->get();

            foreach ($precios as $key => $p) {
                $p = Precio::find($p->idprecio);
                $p->costo = $costo * $p->cantidad;
                $p->save();
                $cCostos++;
            }
        }
        return ["precios" => $cPrecios, "costos" => $cCostos];
    }
}
