<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Vencimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VencimientosController extends Controller
{
    public function index(Request $request)
    {
        $query = Vencimiento::query();

        $query->whereNotNull('vencimiento');
        if ($request->query("search") != "") {
            $query->whereDate("vencimiento", "<", $request->query("search"));
        }
        if ($request->query("tipo") == "pendientes") {
            $query->where("activo", 1);
        }
        if ($request->query("tipo") == "revisados") {
            $query->where("activo", 0);
        }

        $query->with(["producto" => function ($query) {
            $query->with(["precios"]);
        }]);
        $query->orderBy("vencimiento", "asc");
        if ($request->query("limit")) {
            $items = $query->paginate($request->query("limit"));
        } else {
            $items = $query->get();
        }
        return $items;
    }
    public function revisar(Request $request)
    {
        $vencimiento = Vencimiento::find($request->idvencimiento);
        if (!$vencimiento) {
            return response("vencimiento no encontrado", 404);
        }
        $vencimiento->activo = 0;
        $vencimiento->retirados = $request->unidades;
        $vencimiento->comentarios = $request->comentarios;
        $vencimiento->revision_usuario = Auth::User()->usuario;
        $vencimiento->save();
        $producto = Producto::find($vencimiento->idproducto);
        if ($producto) {
            $producto->existencia = $producto->existencia - $vencimiento->unidades;
            $producto->save();
        }
        return response("Vencimiento Actualizado", 200);
    }
}
