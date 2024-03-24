<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use App\Models\Turno;
use App\Models\Venta;
use App\Models\Detalle;
use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class TurnosController extends Controller
{
    public function index(Request $request)
    {

        $query = Turno::query();


        $codigo = $request->query("CASH_CODE");

        if ($codigo != "") {
            $query->join("cajas", "cajas.idcaja", "=", "turnos.idcaja");
            $query->where("cajas.codigo", $codigo);
        }
        $query->orderBy("apertura", "desc");
        $query->with("caja");


        if ($request->query("limit")) {
            $items = $query->paginate($request->query("limit"));
        } else {
            $items = $query->get();
        }
        foreach ($items as $key => $item) {
            $total = Venta::where("idturno", $item->idturno)->sum("total");
            $item->total_ventas = $total;
        }
        return $items;
    }
    public function ver(Request $request, $idturno)
    {
        $turno = Turno::with(["caja", "ventas", "ventas.detalles"])->find($idturno);
        if (!$turno) {
            return response("Turno no encontrado", 404);
        }
        $totales = [];
        $totales["articulos"] = $turno->ventas->sum("articulos");
        $totales["subtotal"] = $turno->ventas->sum("subtotal");
        $totales["descuento"] = $turno->ventas->sum("descuento");
        $totales["total"] = $turno->ventas->sum("total");



        // Consulta para obtener los datos de las ventas
        $ventas = Detalle::join("ventas", "ventas.idventa", "=", "detalles.idventa")
            ->where("ventas.idturno", $turno->idturno)
            ->select("detalles.nombre_producto", DB::raw('SUM(detalles.unidades_presentacion) as cantidad_vendida'))
            ->groupBy('nombre_producto')

            ->get();

        // Preparar los datos para la gráfica
        $nombres = [];
        $cantidades = [];

        foreach ($ventas as $venta) {
            $nombres[] = $venta->nombre_producto;
            $cantidades[] = (float)$venta->cantidad_vendida;
        }



        return [
            "turno" => $turno,
            "totales" => $totales,
            'grafica' => ['etiquetas' => $nombres, 'serie' => $cantidades]
        ];
    }
    public function ventas(Request $request, $idturno)
    {
        $turno = Turno::with(["caja", "ventas", "ventas.detalles"])->find($idturno);
        if (!$turno) {
            return response("Turno no encontrado", 404);
        }
        $ventas = Venta::where("idturno", $idturno)->orderBy("created_at", "desc")->limit(10)->get();
        return $ventas;
    }

    public function disponibles($idcaja)
    {
        $caja = Caja::find($idcaja);
        if (!$caja) {
            return response("La caja no existe", 404);
        }

        $turno = Turno::whereDate("apertura", date("Y-m-d"))
            ->whereNull("cierre")
            ->where("idcaja", $caja->idcaja)
            ->first();

        if (!$turno) {
            $turno = new Turno();
            $turno->idturno = 0;
            $turno->idcaja = $caja->idcaja;
            $turno->nombre = Auth::User()->usuario;
            $turno->apertura = date("Y-m-d h:i:s");
        }

        return $turno;
    }
    public function crear(Request $request)
    {
        $turno = new Turno();
        $turno->idusuario = Auth::User()->idusuario;
        $turno->idcaja = $request->idcaja;
        $turno->nombre = $request->nombre;
        $turno->apertura = $request->apertura;
        $turno->monto = $request->monto;
        $turno->save();
        return $turno;
    }
}
