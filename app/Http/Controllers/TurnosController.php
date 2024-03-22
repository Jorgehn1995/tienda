<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use App\Models\Turno;
use App\Models\Venta;
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
        $turno = Turno::with(["ventas", "ventas.detalles"])->find($idturno);
        if (!$turno) {
            return response("Turno no encontrado", 404);
        }

        return $turno;
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
