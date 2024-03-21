<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use App\Models\Turno;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class TurnosController extends Controller
{
    public function index($caja)
    {
        $turnos = Turno::join("cajas", "cajas.idcaja", "=", "turnos.idcaja")
            ->whereDate("apertura", date("Y-m-d"))
            ->where("cajas.codigo", $caja)
            ->get();
        return $turnos;
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
