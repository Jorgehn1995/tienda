<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductosController extends Controller
{
    public function index(Request $request)
    {

        $query = Producto::query();
        $query->select("productos.*");

        if ($request->query("search") != "") {
            $search = $this->stringsBusqueda($request->query("search"));

            $query->orWhereRaw("MATCH (codigo,nombre) AGAINST ('$search->match' IN BOOLEAN MODE) > 0")

                ->orWhere("codigo", "LIKE", $search->like)
                ->orWhere("nombre", "LIKE", $search->like)
                ->orWhere("costo", "LIKE", $search->like)
                ->orWhere("existencia", "LIKE", $search->like);
        }

        if ($request->query("limit")) {
            $items = $query->paginate($request->query("limit"));
        } else {
            $items = $query->paginate();
        }

        return $items;
    }
    public function ver($codigo)
    {
        $producto = Producto::where("codigo", $codigo)->first();
        if (!$producto) {
            return [
                "codigo" => $codigo,
                "nombre" => "",
                "costo" => 0,
                "existencia" => 0,
                "caducidad" => ""
            ];
        }
        return $producto;
    }
}
