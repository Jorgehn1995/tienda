<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    protected $table      = "clientes";
    protected $primaryKey = "idcliente";
    protected $fillable   = ['nit',  'nombre', 'telefono', 'direccion'];
    public $timestamps    = true;
    public function institucion()
    {
        return $this->belongsTo("App\Models\Institucion", "idinstitucion");
    }

}
