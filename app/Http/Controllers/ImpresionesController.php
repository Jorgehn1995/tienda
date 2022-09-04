<?php

namespace App\Http\Controllers;

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
                $printer->text("Precio 1 $presentacion | ");
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
}
