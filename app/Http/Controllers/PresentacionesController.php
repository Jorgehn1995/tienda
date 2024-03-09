<?php

namespace App\Http\Controllers;

use App\Models\Precio;
use App\Traits\BusquedaTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class PresentacionesController extends Controller
{
    use BusquedaTrait;
    public function index(Request $request)
    {
        if ($request->query("codigo")) {
            $producto = Precio::join("productos", "productos.idproducto", "=", "precios.idproducto")
                ->selectRaw("productos.*, precios.*, precios.nombre as presentacion, productos.nombre as nombre")
                ->where("productos.codigo", $request->query("codigo"))
                ->get();
            //$producto = Producto::where("codigo", $request->query("codigo"))->with("precios")->first();
            return $producto;
        } else {
            $query = Precio::query();
            $query->join("productos", "productos.idproducto", "=", "precios.idproducto");
            $query->selectRaw("productos.*, precios.*, precios.nombre as presentacion, productos.nombre as nombre");
            //$query->select("productos.*");
            if ($request->query("search") != "") {
                $search = $this->stringsBusqueda($request->query("search"));

                $query->whereRaw("MATCH (productos.codigo, productos.nombre, productos.marca, productos.dimension) AGAINST ('$search->matchExact' IN BOOLEAN MODE) > 0")
                    ->whereRaw("MATCH (precios.nombre) AGAINST ('$search->matchExact' IN BOOLEAN MODE) > 0");
                $query->orWhere(function ($q) use ($search) {
                    $q->whereRaw("MATCH (productos.codigo, productos.nombre, productos.marca, productos.dimension) AGAINST ('$search->match' IN BOOLEAN MODE) > 0");
                    $q->whereNotExists(function ($query) use ($search) {
                        $query->select(DB::raw(1))
                            ->from("precios")
                            ->join("productos", "productos.idproducto", "=", "precios.idproducto")
                            ->whereRaw("MATCH (productos.codigo, productos.nombre, productos.marca, productos.dimension) AGAINST ('$search->matchExact' IN BOOLEAN MODE) > 0")
                            ->whereRaw("MATCH (precios.nombre) AGAINST ('$search->matchExact' IN BOOLEAN MODE) > 0");
                    });
                });
            }

            if ($request->query("limit")) {
                $items = $query->paginate($request->query("limit"));
            } else {
                $items = $query->paginate();
            }
            return $items;
        }
    }
}
