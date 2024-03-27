<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use Illuminate\Support\Facades\Storage;
use Milon\Barcode\DNS1D;
use Illuminate\Http\Request;
use PDF;

class PDFController extends Controller
{
    public function recibo(Request $request, $idventa)
    {


        $venta = Venta::with(["detalles.presentacion.producto", "turno.caja"])->find($request->idventa);

        $cantidad = count($venta["detalles"]);

        $copias = 1;
        $cm = 28.34645669;
        $rutaImagen = public_path('images/LG_POS.png');

        // Verificar si el archivo existe antes de intentar leerlo
        if (file_exists($rutaImagen)) {
            $contenidoImagen = file_get_contents($rutaImagen);
            $imagen = 'data:image/jpg;base64,' . base64_encode($contenidoImagen);
        } else {
            // Manejar el caso en que la imagen no existe
            $imagen = "";
        }
        $code = new DNS1D();
        $barcode = $code->getBarcodePNG($venta->documento, 'C128', 3, 33, array(1, 1, 1), true);

        $cmExtra = ($cm * 0.7) * $cantidad;

        $papel = [0, 0, ($cm * 5.8), (300 + $cmExtra)];
        $orientacion = "portrait";
        $data = [
            'barcode' => $barcode,
            'logo' => $imagen,
            'venta' => $venta,
            'copias' => $copias
        ];

        $html = view("pdf.recibo", $data)->render();


        $pdf = PDF::loadHtml($html)->setPaper($papel, $orientacion);
        $pdf->getDomPDF()->set_option("enable_php", true)->set_option('isHtml5ParserEnabled', true);
        return $pdf->download("factura.pdf");
    }
}
