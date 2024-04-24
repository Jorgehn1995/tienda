<?php

namespace App\Http\Controllers;

use App\Models\Detalle;
use DB;
use App\Models\Precio;
use App\Models\Producto;
use App\Models\Vencimiento;
use Illuminate\Http\Request;
use App\Traits\BusquedaTrait;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class ProductosController extends Controller
{
    use BusquedaTrait;
    public function index(Request $request)
    {
        $query = Producto::query();
        $query->select("productos.*");

        $querySearch = $request->query("search");

        if ($querySearch != "") {
            $terminos = explode(":", $querySearch);
            if (count($terminos) > 1) {
                if ($terminos[0] = "id") {
                    $query->where("idproducto", $terminos[1]);
                    $querySearch = "";
                }
            }
        }

        if ($querySearch != "") {
            if (is_numeric($request->query('search'))) {
                $query->where("codigo", $querySearch);
            } else {
                $search = $this->stringsBusqueda($querySearch);
                $query->whereRaw("MATCH (codigo,nombre,marca,dimension) AGAINST ('$search->match' IN BOOLEAN MODE) > 0");
                $query->where(function ($q) use ($search) {
                    $q->where("nombre", "LIKE", $search->like);
                });
            }
        }
        $query->orderBy("nombre");
        $query->with(["precios" => function ($query) {
            $query->orderBy("cantidad");
            $query->select("precios.*");
            $query->selectRaw("0 as costo_nuevo, 0 as stock_nuevo, '' as vencimiento");
        }]);
        $query->with(['vencimientos' => function ($query) {
            $query->orderBy("vencimiento", "desc");
            return $query->limit(5);
        }]);
        if ($request->query("limit")) {
            $items = $query->paginate($request->query("limit"));
        } else {
            $items = $query->get();
        }
        return $items;
    }

    public function ver($idproducto)
    {

        $producto = Producto::with("precios")->find($idproducto);

        if (!$producto) {
            return [
                "idproducto" => 0,
                "codigo" => "",
                "nombre" => "",
                "costo" => 0,
                "existencia" => 0,
                "existencia_nueva" => 0,
                "caducidad" => "",
                "precios" => [[
                    "nombre" => "Unidad",
                    "cantidad" => 1,
                    "precio" => "",
                    "costo" => "",
                    "costo_nuevo" => "",
                    "existencia" => 0,
                    "stock_nuevo" => 0,
                    "vencimiento" => 0
                ]]
            ];
        }
        $vencimientos = Vencimiento::where("idproducto", $idproducto)->orderBy("created_at", "desc")->limit(10)->get();
        $producto->vencimientos = $vencimientos;
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
    public function ventas(Request $request, $idproducto, $group, $inicio, $fin)
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
                'codigo' => 'bail|required|max:40',
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
        $id = 0;
        try {
            DB::beginTransaction();

            $producto = Producto::where("idproducto", $request->idproducto)->first();
            if (!$producto) {
                $producto = new Producto();
            }
            $producto->codigo = $request->codigo;
            $producto->nombre = $request->nombre;
            $producto->marca = $request->marca;
            $producto->dimension = $request->dimension;
            $producto->detalles = $request->detalles;
            $producto->save();
            $producto->precios()->delete();
            $existencia = 0;
            $vencimiento = new Vencimiento();
            $vencimiento->idproducto = $producto->idproducto;
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
                    if ((float)$p["stock_nuevo"] > 0) {
                        $vencimiento->ingreso = Carbon::now()->format("Y-m-d");
                        if ($p["vencimiento"] != "") {
                            $vencimiento->vencimiento = $p["vencimiento"];
                        }
                        if ($vencimiento->detalles) {
                            $vencimiento->detalles = $vencimiento->detalles . ", " . $p["stock_nuevo"] . " " . $p["nombre"];
                        } else {
                            $vencimiento->detalles = $p["stock_nuevo"] . " " . $p["nombre"];
                        }
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
                    $existencia =  $existencia + ((float)$p["stock_nuevo"] * (float)$precio->cantidad);
                    $producto->precios()->save($precio);
                }
            }
            $vencimiento->unidades = $existencia;
            if ($vencimiento->unidades > 0) {
                $vencimiento->save();
            }
            $producto->existencia = (float)$producto->existencia + $existencia;
            $producto->save();
            foreach ($request->vencimientos as $key => $v) {
                $vencimiento = Vencimiento::find($v["idvencimiento"]);
                if ($vencimiento) {
                    $vencimiento->vencimiento = $v["vencimiento"];
                    $vencimiento->activo = $v["activo"];
                    $vencimiento->save();
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response("error: " . $e->getMessage(), 404);
        }
        $id = $producto->idproducto;
        return $this->ver($id);
    }
    public function eliminar($idproducto, Request $request)
    {
        $producto = Producto::find($idproducto);
        if ($producto) {
            $producto->delete();
        }
        return "ok";
    }
}
