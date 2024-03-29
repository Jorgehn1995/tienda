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
            ->where("anulado", 0)

            ->get();

        $ventas = Venta::with("turno.caja")->whereIn("idventa", $identificadores)->with("detalles")
            ->orderBy("created_at", "desc")
            ->get();

        //$populares = Detalle::select("idproducto")
        //    ->whereIn("idventa", $identificadores)
        //    ->selectRaw("SUM(cantidad) as vendidos")
        //    ->groupBy('idproducto')
        //    ->orderByRaw('SUM(cantidad) DESC')
        //    ->limit(10)
        //    ->get();
        $totales["costos"] = round($ventas->sum("costos"), 2);
        $totales["subtotal"] = round($ventas->sum("subtotal"), 2);
        $totales["descuento"] = $ventas->sum("descuento");
        $totales["articulos"] = $ventas->sum("articulos");
        $totales["total"] = round($ventas->sum("total"), 2);
        $totales["ganancias"] = round($totales["total"] - $totales["costos"], 2);


        return ["ventas" => $ventas, "totales" => $totales, "populares" => []];
    }
}
