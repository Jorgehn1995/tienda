<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CajasController extends Controller
{
    public function ver(Request $request, $id)
    {
        $caja = Caja::whereDate("fecha", date("Y-m-d"))->where("codigo", $id)->first();

        if (!$caja) {
            $caja = new Caja();
            $caja->usuario = Auth::User()->usuario;
            $caja->fecha = date("Y-m-d h:i:s");
        }

        return $caja;
    }
    public function disponibles(Request $request, $id)
    {
        $caja = Caja::whereDate("fecha", date("Y-m-d"))->whereNull("cierre")->where("codigo", $id)->first();

        if (!$caja) {
            $caja = new Caja();
            $caja->usuario = Auth::User()->usuario;
            $caja->fecha = date("Y-m-d h:i:s");
        }

        return $caja;
    }
    public function crear(Request $request)
    {
        $caja = new Caja();
        $caja->nombre = $request->nombre;
        $caja->codigo = $request->codigo;
        $caja->fecha = $request->fecha;
        $caja->monto = $request->monto;
        $caja->usuario = $request->usuario;
        $caja->save();
        return $caja;
    }
}
