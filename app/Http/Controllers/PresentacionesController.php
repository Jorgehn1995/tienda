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
            if (is_numeric($request->query('search'))) {
                $query->where("codigo", $request->query("search"));
            } else {
                $terminos = explode("-", $request->query("search"));
                $busqueda = trim($terminos[0]);
                if (isset($terminos[1])) {
                    $precio = trim($terminos[1]);
                } else {
                    $precio = "";
                }
                $search = $this->stringsBusqueda($busqueda);

                //return $search->matchExact2;

                //$query->whereRaw("MATCH (productos.codigo, productos.nombre, productos.marca, productos.dimension) AGAINST ('$search->matchExact2' IN BOOLEAN MODE) > 0")
                //->whereRaw("MATCH (precios.nombre) AGAINST ('$search->matchExact' IN BOOLEAN MODE) > 0");
                $query->where(function ($q) use ($search) {
                    $q->whereRaw("MATCH (productos.codigo, productos.nombre, productos.marca, productos.dimension) AGAINST ('$search->match' IN BOOLEAN MODE) > 0");
                    $q->where("productos.nombre", "like", $search->like);
                });
                if ($precio != "") {
                    $searchPrecio = $this->stringsBusqueda($precio);

                    $query->where("precios.nombre", "like", $searchPrecio->like);
                }
            }
        }

        if ($request->query("limit")) {
            $items = $query->paginate($request->query("limit"));
        } else {
            $items = $query->paginate();
        }
        return $items;
    }
}
