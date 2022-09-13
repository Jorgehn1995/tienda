<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Precio extends Model
{
    use HasFactory;
    protected $table      = "precios";
    protected $primaryKey = "idprecio";
    protected $fillable   = ['idproducto', 'nombre',  'cantidad', 'precio', 'oferta', 'oferta_fecha', 'oferta_limite'];
    public $timestamps    = true;
    public function producto()
    {
        return $this->belongsTo("App\Models\Producto", "idproducto");

    }
}
