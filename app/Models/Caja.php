<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caja extends Model
{
    use HasFactory;
    protected $table      = "cajas";
    protected $primaryKey = "idcaja";
    protected $fillable   = [
        'codigo',
        'nombre',
        'usuario',
        'navegador',
        'os',
    ];
    public $timestamps    = true;
    public function ventas()
    {
        return $this->hasMany("App\Models\Venta", "idcaja");
    }
}
