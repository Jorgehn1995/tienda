<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;
    protected $table      = "ventas";
    protected $primaryKey = "idventa";
    protected $fillable   = ['anulado', 'idcaja','cajero_nombre','idcliente','cliente_nombre','documento','costo','ganancias','subtotal','promociones','descuento','total','comentarios'];
    public $timestamps    = true;
    public function detalles()
    {
        return $this->hasMany("App\Models\Detalle", "idventa");
    }
}
