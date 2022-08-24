<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\BusquedaTrait;

class UsuariosController extends Controller
{
    use BusquedaTrait;
    public function index(Request $request)
    {

        $query = User::query();
        $query->select("usuarios.*");

        if ($request->query("search") != "") {
            $search = $this->stringsBusqueda($request->query("search"));

            $query->orWhereRaw("MATCH (nombre,direccion,telefono,usuario) AGAINST ('$search->match' IN BOOLEAN MODE) > 0")

                ->orWhere("nombre", "LIKE", $search->like)
                ->orWhere("direccion", "LIKE", $search->like)
                ->orWhere("telefono", "LIKE", $search->like)
                ->orWhere("usuario", "LIKE", $search->like);
        }

        if ($request->query("limit")) {
            $items = $query->paginate($request->query("limit"));
        } else {
            $items = $query->paginate();
        }

        return $items;
    }
    public function ver($id)
    {
        $record = User::find($id);
        if (!$record) {
            return response("Cliente no encontrado", 404);
        }
        return $record;
    }
    public function crear(Request $request)
    {
        $request->validate([
            'nombre' => 'bail|required|max:200',
            'usuario' => 'bail|required|unique:usuarios,usuario|max:40',
            'password' => 'bail|min:4',
            'tipo' => 'bail|required',
        ]);

        $record = new User();
        $record->nombre = $request->nombre;
        $record->telefono = $request->telefono;
        $record->usuario = $request->usuario;
        $record->password = bcrypt($request->password);
        $record->tipo = $request->tipo;
        $record->save();
        return "Guardado";
    }
    public function editar(Request $request, $idusuario)
    {
        $request->validate([
            'idusuario' => 'bail|required',
            'usuario' => 'bail|required|unique:usuarios,usuario,' . $request->idusuario . ',idusuario|max:40',
            'nombre' => 'bail|required|max:200',
            'tipo' => 'bail|required',
        ]);

        $record = User::find($request->idusuario);
        if (!$record) {
            return response("Usuario no encontrado");
        }
        $record->nombre = $request->nombre;
        $record->telefono = $request->telefono;
        $record->usuario = $request->usuario;
        $record->tipo = $request->tipo;
        if ($request->password != "") {
            $record->password = bcrypt($request->password);
        }

        $record->save();
        return "Mdificado";
    }
    public function eliminar(Request $request, $idusuario)
    {
        $request->validate([
            'idusuario' => 'bail|required',

        ]);

        $record = User::find($request->idusuario);
        if (!$record) {
            return response("Usuario no encontrado");
        }

        $record->delete();
        return "Eliminado";
    }
}
