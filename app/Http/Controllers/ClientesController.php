<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Traits\BusquedaTrait;

class ClientesController extends Controller
{
    use BusquedaTrait;
    public function index(Request $request)
    {

        $query = Cliente::query();
        $query->select("clientes.*");

        if ($request->query("search") != "") {
            $search = $this->stringsBusqueda($request->query("search"));

            $query->orWhereRaw("MATCH (nit, nombre, telefono, direccion) AGAINST ('$search->match' IN BOOLEAN MODE) > 0")

                ->orWhere("nit", "LIKE", $search->like)
                ->orWhere("nombre", "LIKE", $search->like)
                ->orWhere("telefono", "LIKE", $search->like)
                ->orWhere("direccion", "LIKE", $search->like);
        }

        if ($request->query("limit")) {
            $items = $query->paginate($request->query("limit"));
        } else {
            $items = $query->paginate();
        }

        return $items;
    }
    public function ver($idcliente)
    {
        $cliente = Cliente::find($idcliente);
        if (!$cliente) {
            return response("Cliente no encontrado", 404);
        }
        return $cliente;
    }
}
