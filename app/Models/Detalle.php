<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detalle extends Model
{
    use HasFactory;
    protected $table      = "detalles";
    protected $primaryKey = "iddetalle";
    protected $fillable   = ['idventa', 'nombre_producto', 'presentacion', 'costo', 'venta', 'cantidad', 'ganancias', 'subtotal', 'descuento', 'total'];
    public $timestamps    = true;
    public function venta()
    {
        return $this->belongsTo("App\Models\Venta", "idventa");
    }
    public function presentacion()
    {
        return $this->belongsTo("App\Models\Precio", "idprecio");
    }
}
