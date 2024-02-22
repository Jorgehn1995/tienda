<?php

namespace App\Http\Controllers;

use DB;
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
            $producto = Producto::where("codigo", $request->query("codigo"))->with("precios")->first();
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
    public function porPresentacion(Request $request)
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
                "precios" => [[
                    "nombre" => "Unidad",
                    "cantidad" => 1,
                    "precio" => "",
                    "costo" => 0,
                    "costo_nuevo" => 0,
                    "existencia" => 0,
                    "stock_nuevo" => 0,

                ]]
            ];
        }
        $producto->existencia_nueva = 0;
        $producto->precios;

        foreach ($producto->precios as $key => $precio) {
            $precio->costo_nuevo = 0;
            $precio->stock_nuevo = 0;
        }


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

        try {
            DB::beginTransaction();

            $producto = Producto::where("codigo", $request->codigo)->first();
            if (!$producto) {
                $producto = new Producto();
            }
            $producto->codigo = $request->codigo;
            $producto->nombre = $request->nombre;
            $producto->marca = $request->marca;
            $producto->dimension = $request->dimension;
            //if ($request->existencia_nueva > 0) {
            //    $producto->existencia = $producto->existencia + $request->existencia_nueva;
            //}
            //$producto->costo = $request->costo;
            //$producto->precio = $request->precio;
            //$producto->caducidad = $request->caducidad;
            $producto->save();

            $producto->precios()->delete();

            if ($request->precios) {
                $costo_base = 0;
                $costo_unitario = 0;
                foreach ($request->precios as $key => $p) {
                    if ($key == 0) {
                        $costo_unitario = $p["costo"];
                    }
                    if ($p["costo_nuevo"]) {
                        $costo_base = $p["costo_nuevo"] / $p["cantidad"];
                    }
                }




                foreach ($request->precios as $key => $p) {
                    $precio = new Precio();
                    $precio->idproducto = $producto->idproducto;
                    $precio->cantidad = $p["cantidad"];
                    $precio->precio = $p["precio"];
                    $precio->nombre = $p["nombre"];
                    $precio->costo = $p["costo"];


                    if ($p["costo_nuevo"] > 0) {
                        $precio->costo = $p["costo_nuevo"];
                    } else {
                        if ($costo_base > 0) {
                            $precio->costo = $costo_base * $p["cantidad"];
                        }
                    }

                    if (!$precio->costo) {
                        $precio->costo = $costo_unitario * $p["cantidad"];
                    }

                    //$precio->existencia = (float)$p["existencia"] + (float)$p["stock_nuevo"];
                    $producto->existencia = (float)$producto->existencia + ((float)$p["stock_nuevo"] * (float)$precio->cantidad);
                    $producto->precios()->save($precio);
                }
            }
            $producto->save();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response("error: " . $e->getMessage(), 404);
        }
        return "Producto Guardado";
    }
}
