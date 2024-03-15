<?php

namespace App\Http\Controllers;

use App\Models\Vencimiento;
use Illuminate\Http\Request;

class VencimientosController extends Controller
{
    public function index(Request $request)
    {
        $query = Vencimiento::query();

        if ($request->query("search") != "") {
            $query->whereDate("vencimiento", "<", $request->query("search"));
        }
        if ($request->query("tipo") == "pendientes") {
            $query->where("activo", 1);
        }

        $query->with("producto");
        $query->orderBy("vencimiento", "asc");
        if ($request->query("limit")) {
            $items = $query->paginate($request->query("limit"));
        } else {
            $items = $query->get();
        }
        return $items;
    }
}
