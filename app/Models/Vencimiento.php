<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vencimiento extends Model
{
    use HasFactory;
    protected $table      = "vencimientos";
    protected $primaryKey = "idvencimiento";
    protected $fillable   = ["idproducto", "ingreso", "vencimiento", "revision_usuario", "unidades", "detalles"];
    public $timestamps    = true;
    public function producto()
    {
        return $this->belongsTo("App\Models\Producto", "idproducto");
    }
}
