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
    public function crear(Request $request)
    {
        $request->validate([
            'nit' => 'bail|required|unique:clientes,nit|max:40',
            'nombre' => 'bail|required|max:200',
            'telefono' => 'bail|required|max:200',
            'direccion' => 'bail|required|max:200',
        ]);

        $cliente = new Cliente();
        $cliente->nit = $request->nit;
        $cliente->nombre = $request->nombre;
        $cliente->telefono = $request->telefono;
        $cliente->direccion = $request->direccion;
        $cliente->save();
        return "Guardado";
    }
    public function editar(Request $request, $idcliente)
    {
        $request->validate([
            'idcliente' => 'bail|required',
            'nit' => 'bail|required|unique:clientes,nit,' . $request->idcliente . ',idcliente|max:40',
            'nombre' => 'bail|required|max:200',
            'telefono' => 'bail|required|max:200',
            'direccion' => 'bail|required|max:200',
        ]);

        $cliente = Cliente::find($request->idcliente);
        if (!$cliente) {
            return response("Cliente no encontrado");
        }
        $cliente->nit = $request->nit;
        $cliente->nombre = $request->nombre;
        $cliente->telefono = $request->telefono;
        $cliente->direccion = $request->direccion;
        $cliente->save();
        return "Mdificado";
    }
    public function eliminar(Request $request, $idcliente)
    {
        $request->validate([
            'idcliente' => 'bail|required',

        ]);

        $cliente = Cliente::find($request->idcliente);
        if (!$cliente) {
            return response("Cliente no encontrado");
        }

        $cliente->delete();
        return "Eliminado";
    }
}
