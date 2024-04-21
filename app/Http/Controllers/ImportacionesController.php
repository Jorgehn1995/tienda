<?php

namespace App\Http\Controllers;

use Excel;
use App\Imports\ImportarProductos as Import;
use Illuminate\Http\Request;

class ImportacionesController extends Controller
{
    public function importarProductos(Request $request)
    {

        $import = new Import;
        Excel::import($import, $request->file('archivo'));
        return $import->data;
    }
    public function guardarRegistros(Request $request)
    {
        return $request->all();
    }
}
