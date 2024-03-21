<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    use HasFactory;
    protected $table      = "turnos";
    protected $primaryKey = "idturno";
    protected $fillable   = [
        'idcaja',
        'idusuario',
        'nombre',
        'apertura',
        'cierre',
        'monto',
        'subtotal',
        'descuento',
        'total'
    ];
    public $timestamps    = true;
    public function caja()
    {
        return $this->belongsTo("App\Models\Caja", "idcaja");
    }
}
