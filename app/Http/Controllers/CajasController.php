<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CajasController extends Controller
{
    public function index(Request $request)
    {
        return Caja::selectRaw("cajas.*, 0 as isLoading")->get();
    }
    public function verificar(Request $request, $codigo)
    {
        $caja = Caja::where("codigo", $codigo)->first();
        if (!$caja) {
            return response("El codigo no existe", 404);
        }
        return $caja;
    }
    public function crear(Request $request)
    {
        $nombre = Caja::where("nombre", $request->nombre)->count();
        if ($nombre > 0) {
            return response("El nombre " . $request->nombre . " ya ha sido registrado", 404);
        }
        $caja = new Caja();
        $caja->codigo = $request->codigo;
        $caja->nombre = $request->nombre;
        $caja->descripcion = $request->descripcion;
        $caja->idusuario = Auth::User()->idusuario;
        $caja->usuario = Auth::User()->nombre;
        $caja->navegador = $request->navegador;
        $caja->version = $request->version;
        $caja->os = $request->os;
        $caja->estado = 1;
        $caja->save();
        return $caja;
    }
    public function cambiarEstado($idcaja)
    {
        $caja = Caja::find($idcaja);
        if (!$caja) {
            return response("Caja no encontrada", 404);
        }
        $caja->estado = $caja->estado == 1 ? 0 : 1;
        $caja->save();
        return $caja;
    }
    //public function ver(Request $request, $code)
    //{
    //    $caja = Caja::where("codigo", $code)->first();
    //    return $caja;
    //}

    //public function ver(Request $request, $id)
    //{
    //    $caja = Caja::with("facturas.detalles")
    //        ->where("codigo", $id)
    //        ->first();
    //
    //    if (!$caja) {
    //        return response("No hay caja habilitada", 404);
    //    }
    //
    //    return $caja;
    //}
    //
    //public function disponibles(Request $request, $id)
    //{
    //    $caja = Caja::whereDate("fecha", date("Y-m-d"))->whereNull("cierre")->where("codigo", $id)->first();
    //
    //    if (!$caja) {
    //        $caja = new Caja();
    //        $caja->usuario = Auth::User()->usuario;
    //        $caja->fecha = date("Y-m-d h:i:s");
    //    }
    //
    //    return $caja;
    //}
    //public function crear(Request $request)
    //{
    //    $caja = new Caja();
    //    $caja->nombre = $request->nombre;
    //    $caja->codigo = $request->codigo;
    //    $caja->fecha = $request->fecha;
    //    $caja->monto = $request->monto;
    //    $caja->usuario = $request->usuario;
    //    $caja->save();
    //    return $caja;
    //}
    //
    //public function ventas($codigo)
    //{
    //    $caja = Caja::with("ventas.detalles")
    //        ->where("codigo", $codigo)
    //        ->first();
    //
    //    if (!$caja) {
    //        return response("No hay caja habilitada", 404);
    //    }
    //
    //    return $caja;
    //}
}
