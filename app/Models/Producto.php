<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    protected $table      = "productos";
    protected $primaryKey = "idproducto";
    protected $fillable   = ['codigo', 'nombre', 'costo', 'caducidad', 'existencia'];
    public $timestamps    = true;
    public function precios()
    {
        return $this->hasMany("App\Models\Precio", "idproducto")->orderBy("cantidad", "asc");
    }
    public function vencimientos()
    {
        return $this->hasMany("App\Models\Vencimiento", "idproducto");
    }
}
