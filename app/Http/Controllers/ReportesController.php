<?php

namespace App\Http\Controllers;

use App\Models\Detalle;
use App\Models\Producto;
use App\Models\Venta;
use Illuminate\Http\Request;

class ReportesController extends Controller
{
    public function index($inicio, $fin)
    {
        $identificadores = Venta::select("idventa")->whereDate("created_at", ">=", $inicio)->whereDate("created_at", "<=", $fin)
            ->where("anulado", 0)->get();

        $ventas = Venta::whereIn("idventa", $identificadores)->with("detalles")->get();

        //$populares = Detalle::select("idproducto")
        //    ->whereIn("idventa", $identificadores)
        //    ->selectRaw("SUM(cantidad) as vendidos")
        //    ->groupBy('idproducto')
        //    ->orderByRaw('SUM(cantidad) DESC')
        //    ->limit(10)
        //    ->get();

        $totales["articulos"] = $ventas->sum("articulos");
        $totales["total"] = $ventas->sum("total");


        return ["ventas" => $ventas, "totales" => $totales, "populares" => []];
    }
}
