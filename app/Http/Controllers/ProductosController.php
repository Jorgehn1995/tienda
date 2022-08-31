<?php

namespace App\Http\Controllers;

use App\Models\Precio;
use App\Models\Producto;
use Illuminate\Http\Request;
use App\Traits\BusquedaTrait;

class ProductosController extends Controller
{
    use BusquedaTrait;
    public function index(Request $request)
    {



        if ($request->query("codigo")) {
            $producto=Producto::where("codigo",$request->query("codigo"))->with("precios")->first();
            return $producto;
        } else {
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
            $query->with("precios");
            if ($request->query("limit")) {
                $items = $query->paginate($request->query("limit"));
            } else {
                $items = $query->paginate();
            }
            return $items;
        }
    }
    public function ver($codigo)
    {
        $producto = Producto::where("codigo", $codigo)->first();
        if (!$producto) {
            return [
                "idproducto" => 0,
                "codigo" => $codigo,
                "nombre" => "",
                "costo" => 0,
                "existencia" => 0,
                "existencia_nueva" => 0,
                "caducidad" => "",
                "precios" => [
                    [
                        "cantidad" => 1,
                        "nombre" => "Unidad",
                        "precio" => "",
                    ]
                ]
            ];
        }
        $producto->existencia_nueva = 0;
        $producto->precios;

        return $producto;
    }
    public function crear(Request $request)
    {
        if ($request->idproducto == 0) {
            $request->validate([
                'codigo' => 'bail|required|unique:productos,codigo|max:40',
                'nombre' => 'bail|required',
                'precios.*.cantidad' => 'bail|required|numeric',
                'precios.*.precio' => 'bail|required|numeric',
            ]);
        } else {
            $request->validate([
                'codigo' => 'bail|required|unique:productos,codigo,' . $request->idproducto . ',idproducto|max:40',
                'nombre' => 'bail|required',
                'precios.*.cantidad' => 'bail|required|numeric',
                'precios.*.precio' => 'bail|required|numeric',
            ]);
        }

        $producto = Producto::where("codigo", $request->codigo)->first();
        if (!$producto) {
            $producto = new Producto();
        }
        $producto->codigo = $request->codigo;
        $producto->nombre = $request->nombre;
        if ($request->existencia_nueva > 0) {
            $producto->existencia = $producto->existencia + $request->existencia_nueva;
        }
        $producto->costo = $request->costo;
        $producto->caducidad = $request->caducidad;
        $producto->save();

        $producto->precios()->delete();

        foreach ($request->precios as $key => $p) {
            $precio = new Precio();
            $precio->idproducto = $producto->idproducto;
            $precio->cantidad = $p["cantidad"];
            $precio->precio = $p["precio"];
            $precio->nombre=$p["nombre"];
            $precio->save();
        }
        return "Producto Guardado";
    }
}
