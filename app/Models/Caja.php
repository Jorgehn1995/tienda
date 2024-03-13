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
        'nombre',
        'fecha',
        'monto',
        'usuario',
        'cierre',
        'subtotal',
        'descuento',
        'total'
    ];
    public $timestamps    = true;
    public function institucion()
    {
        return $this->belongsTo("App\Models\Institucion", "idinstitucion");
    }
}
