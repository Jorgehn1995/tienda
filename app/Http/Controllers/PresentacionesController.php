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

        $query = Precio::query();
        $query->join("productos", "productos.idproducto", "=", "precios.idproducto");
        $query->selectRaw("precios.*, 0 as carrito");
        $query->with("producto");
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
