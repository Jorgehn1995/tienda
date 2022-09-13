<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use Storage;
use Mike42\Escpos\Printer;
use Mike42\Escpos\EscposImage;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Illuminate\Http\Request;

class ImpresionesController extends Controller
{
    public function imprimir()
    {
        try {
            $connector = new WindowsPrintConnector("POS80");

            $printer = new Printer($connector);
            //$printer->setPrintWidth(200);
            /* Title of receipt */


            //$img = EscposImage::load("logoty.png",10);

            //$printer->graphics($img);
            //$printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->setEmphasis(true);
            $printer->setFont(Printer::FONT_C);
            $printer->text("Tienda Yaque\n");
            $printer->setEmphasis(false);


            $printer->text("Papel bond cuadricula tamaño carta\n");


            $printer->setJustification(Printer::JUSTIFY_RIGHT);
            $printer->setTextSize(3, 2);
            $printer->text("Q");
            $printer->setTextSize(6, 4);
            $printer->text("10");

            $printer->setTextSize(3, 2);
            $printer->text(".99\n");

            $printer->setTextSize(1, 1);
            $printer->text("Precio Unidad (1u) | ");
            //$printer->setBarcodeHeight(50);
            //$printer->barcode("125479124785", Printer::BARCODE_CODE39);

            $printer->text("Código: 125479124785\n");
            $printer->cut(Printer::CUT_FULL, 9);

            $printer->close();
        } catch (Exception $e) {
            echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
        }
    }
    public function precio(Request $request)
    {
        $impresora = env("IMPRESORA");
        $tienda = env("TIENDA");
        $codigo = $request->codigo;
        $descripcion = $request->descripcion;
        $precio = explode(".", $request->precio);
        $presentacion = $request->presentacion;
        $unidades = $request->unidades;
        $copias = $request->copias;
        try {
            $connector = new WindowsPrintConnector($impresora);

            $printer = new Printer($connector);
            for ($i = 0; $i < $copias; $i++) {
                //$printer->setPrintWidth(200);
                /* Title of receipt */


                //$img = EscposImage::load("logoty.png",10);

                //$printer->graphics($img);
                //$printer->setJustification(Printer::JUSTIFY_CENTER);
                $printer->setEmphasis(true);
                $printer->setFont(Printer::FONT_C);
                $printer->text("$tienda\n");
                $printer->setEmphasis(false);


                $printer->text("$descripcion - $presentacion\n");


                $printer->setJustification(Printer::JUSTIFY_RIGHT);
                $printer->setTextSize(3, 2);
                $printer->text("Q ");
                $printer->setTextSize(6, 4);
                $printer->text($precio[0]);

                $printer->setTextSize(3, 2);
                $printer->text(".$precio[1]\n");

                $printer->setTextSize(1, 1);
                $printer->text("Precio x $presentacion | $unidades unidades \n");
                //$printer->setBarcodeHeight(50);
                //$printer->barcode("125479124785", Printer::BARCODE_CODE39);

                $printer->text("Código: $codigo\n");
                $printer->cut(Printer::CUT_FULL, 9);
            }

            $printer->close();
        } catch (Exception $e) {
            echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
        }
    }
    public function barcode(Request $request)
    {
        $impresora = env("IMPRESORA");
        $tienda = env("TIENDA");
        $largo = strlen($request->codigo);
        if ($largo < 13) {
            $barcode = Printer::BARCODE_CODE39;
        } else {
            $barcode = Printer::BARCODE_JAN13;
        }

        $codigo = $request->codigo;
        $descripcion = $request->descripcion;
        $copias = $request->copias;
        try {
            $connector = new WindowsPrintConnector($impresora);

            $printer = new Printer($connector);
            for ($i = 0; $i < $copias; $i++) {

                /* Title of receipt */
                $printer->setJustification(Printer::JUSTIFY_CENTER);

                $printer->setEmphasis(true);
                $printer->setFont(Printer::FONT_C);
                $printer->text("$tienda\n");
                $printer->setEmphasis(false);


                $printer->text("$descripcion \n");


                $printer->setBarcodeHeight(60);
                $printer->setBarcodeWidth(3);
                $printer->barcode("$codigo", $barcode);

                $printer->text("$codigo\n");
                $printer->cut(Printer::CUT_FULL, 9);
            }

            $printer->close();
        } catch (Exception $e) {
            echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
        }
    }
    public function recibo($doc)
    {

        $venta = Venta::where("documento", $doc)->with("detalles")->first();



        $impresora = env("IMPRESORA");
        $tienda = env("TIENDA");

        $copias = 1;
        try {
            $connector = new WindowsPrintConnector($impresora);

            $printer = new Printer($connector);
            for ($i = 0; $i < $copias; $i++) {
                //$printer->setPrintWidth(200);
                /* Title of receipt */


                //$img = EscposImage::load("logoty.png",10);

                //$printer->graphics($img);
                //$printer->setJustification(Printer::JUSTIFY_CENTER);
                $printer->setJustification(Printer::JUSTIFY_CENTER);
                $printer->setTextSize(2, 1);
                $printer->setEmphasis(true);
                //$printer->setFont(Printer::FONT_B);
                $printer->text("$tienda\n");
                $printer->setEmphasis(false);
                $printer->setTextSize(1, 1);
                $printer->text("Barrio el calvario \n");
                $printer->text("San Luis Jilotepeque \n");
                $printer->text("Jalapa, Jalapa \n");
                $printer->text(" \n");
                $printer->setJustification(Printer::JUSTIFY_LEFT);
                $printer->text(" \n");

                $printer->text("Caja. Caja 1 \n");
                $printer->text("Le atendio: $venta->cajero_nombre \n");
                $printer->text("Nombre. Cliente Final \n");
                $printer->text(" \n");

                //$printer->setJustification(Printer::JUSTIFY_CENTER);
                //$printer->text("================================================ \n");
                //$printer->setJustification(Printer::JUSTIFY_LEFT);


                foreach ($venta->detalles as $key => $detalle) {
                    //$printer->setJustification(Printer::JUSTIFY_LEFT);
                    //$printer->text("$detalle->nombre_producto $detalle->codigo \n");
                    //$printer->setJustification(Printer::JUSTIFY_RIGHT);
                    //$printer->text(" $detalle->cantidad ");
                    //$printer->textRaw(" \t");
                    //$printer->textRaw("Q$detalle->precio  $detalle->total \n");
                    //$printer->text("$detalle->total \n");
                    $nombre=substr($detalle->nombre_producto, 0, 25)." ".$detalle->codigo;
                    $printer->text("$nombre\n");
                    $line = sprintf('%-13.40s %3.0f %-3.40s %9.40s %-2.40s %13.40s', "", $detalle->cantidad, "x", "Q " . $detalle->precio, "", "Q ".$detalle->total);
                    $printer->text("$line\n");
                }
                if ($venta->descuento > 0) {
                    //$printer->setJustification(Printer::JUSTIFY_LEFT);
                    //$printer->text("Descuento por venta");
                    //$printer->setJustification(Printer::JUSTIFY_RIGHT);
                    //$printer->text(" -$venta->descuento \n");
                }
                $printer->setJustification(Printer::JUSTIFY_RIGHT);
                $printer->setEmphasis(true);
                $lineTotal = sprintf('%-5.40s %-1.05s %13.40s', 'TOTAL.', '', "Q ".$venta->total);
                $printer->text("$lineTotal\n");
                $printer->setEmphasis(false);
                $lineTotal = sprintf('%-5.40s %-1.05s %13.40s', 'Efectivo.', '', "Q ".$venta->efectivo);
                $printer->text("$lineTotal\n");
                $lineTotal = sprintf('%-5.40s %-1.05s %13.40s', 'Cambio.', '', "Q ".$venta->cambio);
                $printer->text("$lineTotal\n");
                $printer->text(" \n");

                $printer->setJustification(Printer::JUSTIFY_LEFT);
                $printer->text("No. articulos vendidos. $venta->articulos \n");
                $printer->text("No. referencia. $venta->idventa \n ");
                //$printer->text("Fecha y hora: ".date("d-m-Y h:i:s a")." \n");

                $printer->setJustification(Printer::JUSTIFY_CENTER);
                $printer->text(" \n");
                $printer->qrCode($doc,Printer::QR_ECLEVEL_L,8);
                $printer->text(" \n");
                $printer->text("Recibo no. $venta->documento \n");
                $printer->text("Fecha y hora: ".date("d-m-Y h:i:s a")." \n");

                $printer->setJustification(Printer::JUSTIFY_CENTER);
                $printer->setTextSize(2, 1);
                $printer->setEmphasis(true);
                //$printer->setFont(Printer::FONT_B);
                $printer->text("VUELVA PRONTO\n");
                $printer->setEmphasis(false);
                $printer->cut(Printer::CUT_FULL, 9);
            }

            $printer->close();
        } catch (Exception $e) {
            echo "Couldn't print to this printer: " . $e->getMessage() . "\n";
        }
    }
}
