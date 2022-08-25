<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Existencia extends Model
{
    use HasFactory;
    protected $table      = "existencias";
    protected $primaryKey = "idexistencia";
    protected $fillable   = ['idproducto',  'costo', 'caducidad', 'existencia'];
    public $timestamps    = true;
    public function producto()
    {
        return $this->belongsTo("App\Models\Producto", "idproducto");
    }
}
