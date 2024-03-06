<?php

namespace App\Http\Controllers;

use App\Models\Detalle;
use DB;
use App\Models\Precio;
use App\Models\Producto;

use Illuminate\Http\Request;
use App\Traits\BusquedaTrait;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

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
                $query->orWhereRaw("MATCH (codigo,nombre,marca,dimension) AGAINST ('$search->match' IN BOOLEAN MODE) > 0")

                    ->orWhere("codigo", "LIKE", $search->like)
                    ->orWhere("nombre", "LIKE", $search->like)
                    ->orWhere("costo", "LIKE", $search->like)
                    ->orWhere("existencia", "LIKE", $search->like);
            }
            $query->with("precios");
            if ($request->query("limit")) {
                $items = $query->paginate($request->query("limit"));
            } else {
                $items = $query->get();
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
                    "vencimiento" => 0
                ]]
            ];
        }
        $producto->existencia_nueva = 0;
        $producto->precios;

        foreach ($producto->precios as $key => $precio) {
            $precio->costo_nuevo = 0;
            $precio->stock_nuevo = 0;
            $precio->vencimiento = "";
        }


        return $producto;
    }
    public function leer($idproducto)
    {

        $producto = Producto::with('precios')->find($idproducto);
        if (!$producto) {
            return response("Producto no encontrado", 404);
        }


        foreach ($producto->precios as $key => $precio) {
            $p = Detalle::where("idprecio", $precio->idprecio)->get();
            $precio->vendidos_cantidad = $p->sum("cantidad");
            $precio->vendidos_unidades = $p->sum("unidades_vendidas");
            $precio->vendidos_costos = $p->sum("costo");
            $precio->vendidos_total = $p->sum("total");
            $precio->vendidos_ganancia = $precio->vendidos_total - $precio->vendidos_costos;
            if ($precio->vendidos_total > 0) {
                $precio->vendidos_margen = round((($precio->vendidos_total - $precio->vendidos_costos) / $precio->vendidos_total) * 100, 2);
            } else {
                $precio->vendidos_margen = 0;
            }
        }

        $producto->vendidos_cantidad = $producto->precios->sum("vendidos_cantidad");
        $producto->vendidos_unidades = $producto->precios->sum("vendidos_unidades");
        $producto->vendidos_costos = $producto->precios->sum("vendidos_costos");
        $producto->vendidos_total = $producto->precios->sum("vendidos_total");
        $producto->vendidos_ganancia = $producto->precios->sum("vendidos_ganancia");
        $producto->vendidos_margen = $producto->precios->sum("vendidos_margen");




        return $producto;
    }
    public function detalles(Request $request, $idproducto, $group, $inicio, $fin)
    {
        $producto = Producto::with('precios')->find($idproducto);
        if (!$producto) {
            return response("Producto no encontrado", 404);
        }

        $presentaciones = [];
        foreach ($producto->precios as $key => $precio) {
            $p = Detalle::where("idprecio", $precio->idprecio)
                ->whereBetween('created_at', [$inicio, $fin])
                ->get();
            $precio->vendidos_cantidad = $p->sum("cantidad");
            $precio->vendidos_unidades = $p->sum("unidades_vendidas");
            $precio->vendidos_costos = $p->sum("costo");
            $precio->vendidos_total = $p->sum("total");
            $precio->vendidos_ganancia = $precio->vendidos_total - $precio->vendidos_costos;
            if ($precio->vendidos_total > 0) {
                $precio->vendidos_margen = round((($precio->vendidos_total - $precio->vendidos_costos) / $precio->vendidos_total) * 100, 2);
            } else {
                $precio->vendidos_margen = 0;
            }
            $presentaciones[$precio->nombre] = 0;
        }
        $producto->inicio = $inicio;
        $producto->fin = $fin;
        $producto->vendidos_cantidad = $producto->precios->sum("vendidos_cantidad");
        $producto->vendidos_unidades = $producto->precios->sum("vendidos_unidades");
        $producto->vendidos_costos = $producto->precios->sum("vendidos_costos");
        $producto->vendidos_total = $producto->precios->sum("vendidos_total");
        $producto->vendidos_ganancia = $producto->precios->sum("vendidos_ganancia");
        $producto->vendidos_margen = $producto->precios->sum("vendidos_margen");

        switch ($group) {
            case 'Día':
                $format = "Y-m-d";
                $period = "1 day";
                break;
            case 'Mes':
                $format = "m-y";
                $period = "1 month";
                break;
            case 'Año':
                $format = "y";
                $period = "1 year";
                break;
            default:
                $format = "Y-m-d";
                $period = "1 day";
                break;
        }

        $inicio = Carbon::parse($inicio); // Fecha de inicio del rango
        $fin = Carbon::parse($fin); // Fecha de fin del rango

        // Crear un período de fechas desde la fecha de inicio hasta la fecha de fin
        if ($period == "1 day") {
            $periodo = CarbonPeriod::create($inicio, $period, $fin);
        } else {
            $periodo = CarbonPeriod::create($inicio->startOfMonth(), $period, $fin->startOfMonth());
        }


        $detalles = Detalle::where("idproducto", $precio->idproducto)
            ->whereBetween('created_at', [$inicio, $fin])
            ->get();


        $ventas =
            $detalles->groupBy([function ($val) use ($format, $group) {
                return Carbon::parse($val->created_at)->format($format);
            }, "presentacion"]);


        $grafica = [];
        $i = 0;
        foreach ($periodo as $fecha) {
            $grafica[$i] = ["fecha" => $fecha->format($format), "ventas" => $presentaciones];

            if (isset($ventas[$fecha->format($format)])) {
                foreach ($presentaciones as $key => $presentacion) {
                    if (isset($ventas[$fecha->format($format)][$key])) {
                        $grafica[$i]["ventas"][$key] = $ventas[$fecha->format($format)][$key]->sum("cantidad");
                    }
                }
            }
            $i++;
        }

        $producto->detalles = $grafica;



        /**
         * SE AGREGA LAS VENTAS ORDENDAS POR DIA DE SEMANA
         */
        $ventas = $detalles->groupBy(function ($val) use ($format, $group) {
            return Carbon::parse($val->created_at)->dayOfWeek;
        })
            ->map(function ($group) {
                return $group->count();
            });
        $dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
        $semana = [];
        for ($i = 0; $i < count($dias); $i++) {
            $semana[$i] = ["dia" => $dias[$i], "ventas" => 0];
            if (isset($ventas[$i])) {
                $semana[$i]["ventas"] = $ventas[$i];
            }
        }
        $producto->diasVenta = $semana;


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
