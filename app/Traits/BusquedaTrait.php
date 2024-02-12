<?php

namespace App\Traits;

use Illuminate\Support\Collection;

trait BusquedaTrait
{
    public function eliminar_acentos($cadena)
    {

        //Reemplazamos la A y a
        $cadena = str_replace(
            array('Á', 'À', 'Â', 'Ä', 'á', 'à', 'ä', 'â', 'ª'),
            array('A', 'A', 'A', 'A', 'a', 'a', 'a', 'a', 'a'),
            $cadena
        );

        //Reemplazamos la E y e
        $cadena = str_replace(
            array('É', 'È', 'Ê', 'Ë', 'é', 'è', 'ë', 'ê'),
            array('E', 'E', 'E', 'E', 'e', 'e', 'e', 'e'),
            $cadena
        );

        //Reemplazamos la I y i
        $cadena = str_replace(
            array('Í', 'Ì', 'Ï', 'Î', 'í', 'ì', 'ï', 'î'),
            array('I', 'I', 'I', 'I', 'i', 'i', 'i', 'i'),
            $cadena
        );

        //Reemplazamos la O y o
        $cadena = str_replace(
            array('Ó', 'Ò', 'Ö', 'Ô', 'ó', 'ò', 'ö', 'ô'),
            array('O', 'O', 'O', 'O', 'o', 'o', 'o', 'o'),
            $cadena
        );

        //Reemplazamos la U y u
        $cadena = str_replace(
            array('Ú', 'Ù', 'Û', 'Ü', 'ú', 'ù', 'ü', 'û'),
            array('U', 'U', 'U', 'U', 'u', 'u', 'u', 'u'),
            $cadena
        );

        //Reemplazamos la N, n, C y c
        $cadena = str_replace(
            array('Ñ', 'ñ', 'Ç', 'ç'),
            array('N', 'n', 'C', 'c'),
            $cadena
        );

        return $cadena;
    }
    public function stringsBusqueda($string)
    {

        $search = strtolower($this->eliminar_acentos($string));
        $searchSeccion = "";
        $serachPresentacion = "";
        $searchNumber = "";
        $searchString = "";
        $sec = explode(" ", $string);

        foreach ($sec as $key => $s) {
            if (strlen($s) == 1) {

                $searchSeccion =  $s;
            } else {
                $searchString == "" ? $searchString = $s : $searchString .= " " . $s;
            }
            if (is_numeric($s)) {
                $searchNumber != "" ? $searchNumber .= "|" : $searchNumber = $searchNumber;
                $searchNumber .= $s;
            }
        }

        //$searchMatch = "+*" . str_replace(" ", "* +*", $searchString) . "*";
        $searchMatchExact = "" . str_replace(" ", "*", $searchString) . "*"; //SE MUESTRA LA UNIDAD PERO NO EL PRODUCTO
        $searchMatch = "+" . str_replace(" ", "*", $searchString) . "*"; //SE MUESTRA el producto perono la presentacion

        $searchLike = "%" . str_replace(" ", "%", $searchString) . "%";

        $serachPresentacion = "%" . str_replace(" ", "%", $serachPresentacion) . "%";
        $r = new Collection();

        $r->match = $searchMatch;
        $r->matchExact = $searchMatchExact;
        $r->presentacion = $serachPresentacion;
        $r->like = $searchLike;
        $r->string = $searchString;
        $r->number = $searchNumber;
        $r->char = $searchSeccion;

        return $r;
    }
}
