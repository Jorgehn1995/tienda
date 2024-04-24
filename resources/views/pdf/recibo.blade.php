<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Recibo</title>
    <style>
        @page{margin: 0.3cm;
        }
        .text-center{
            text-align: center;
        }
        body {
            font-size: 9px; /* Establece el tamaño de fuente a 16px */
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <div class="text-center">
        <img width="50%" src="{{$logo}}" alt="">
    </div>
    <div class="text-center" style="margin-top:5px; margin-bottom:5px">
        <span>{{env("municipio")}}, {{env("departamento")}}</span>
        <br>
        <span>{{env("barrio")}}</span>
        <br>
        <span>{{env("telefono")}}</span>
    </div>
    <table style="width: 100%">
        <tbody>
            <tr>
                <td>
                    <strong>Caja:</strong>
                </td>
                <td>
                    @if ($venta->turno)
                        {{$venta->turno->caja->nombre}}
                    @else
                        No Registrado
                    @endif
                </td>
                <td>
                    <strong>Atendió:</strong>
                </td>
                <td>
                    {{$venta->cajero_nombre}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Cliente:</strong>
                </td>
                <td>
                    {{$venta->cliente_nombre?$venta->cliente_nombre: "C/F"}}
                </td>
                <td>
                    <strong>Estado:</strong>
                </td>
                <td>
                    @if ($venta->anulado)
                        Anulado
                    @else
                        Procesado
                    @endif
                </td>
            </tr>
        </tbody>
    </table>
    <span>*******************************************</span>
    <table style="width: 100%">
        <thead>
            <tr>
                <th style="text-align: left;">
                    Descrip. / Cod.
                </th>
                <th>Cnt.
                    <br>
                    Pres.
                </th>
                <th style="min-width: 50px !important">Precio</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($venta->detalles as $detalle)
                <tr>
                    <td>
                        {{$detalle->nombre_producto}}
                        {{$detalle->presentacion}} /
                        {{$detalle->codigo}}
                    </td>
                    <td style="text-align: right">
                        {{$detalle->cantidad}} x
                    </td>
                    <td style="text-align: right">
                        <span>
                            Q
                            <span style="text-align: right; min-width:70px !important">
                                {{$detalle->precio}}
                            </span>
                        </span>
                        <br>
                    </td>
                </tr>
            @endforeach
            <tr>
                <td colspan="3">

                    <span style="color: #a8a8a8">---------------------------------------------------------------</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    Subtotal
                </td>
                <td style="text-align: right">
                    <span>
                        Q
                        <span style="text-align: right; min-width:70px !important">
                            {{$venta->subtotal}}
                        </span>
                    </span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    Descuento
                </td>
                <td style="text-align: right">
                    <span>
                        Q
                        <span style="text-align: right; min-width:70px !important">
                            {{$venta->descuento}}
                        </span>
                    </span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <strong>
                        Total
                    </strong>
                </td>
                <td style="text-align: right">
                    <strong>
                        <span style="text-align: right;">
                            Q
                            <span style="text-align: right; font-size:12px">
                                {{$venta->total}}
                            </span>
                        </span>
                    </strong>
                </td>
            </tr>
        </tbody>
    </table>
    <span>*******************************************</span>
    <table style="width: 100%">
        <tbody>
            <tr>
                <td >
                    Efectivo
                </td>
                <td style="text-align: right">
                    <span>
                        Q
                        <span style="text-align: right; min-width:70px !important">
                            {{$venta->efectivo}}
                        </span>
                    </span>
                </td>
            </tr>
            <tr>
                <td >
                    Cambio
                </td>
                <td style="text-align: right">
                    <span>
                        Q
                        <span style="text-align: right; min-width:70px !important">
                            {{$venta->cambio}}
                        </span>
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
     <table style="width: 100%; margin-top:15px;">
        <tbody>
            <tr>
                <td>
                    <strong>Documento:</strong>
                </td>
                <td >
                    {{$venta->documento}}
                </td>
            </tr>

            <tr>
                <td>
                    <strong>Fecha:</strong>
                </td>
                <td>
                    {{$venta->created_at}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Referencia de Turno:</strong>
                </td>
                <td>
                     @if ($venta->turno)
                        {{$venta->turno->idturno}}
                    @else
                        00-00
                    @endif

                </td>
            </tr>
        </tbody>
    </table>
    <div class="text-center" style="margin:5px;">
        <img width="100%" height="30px"  src="data:image/png;base64,{{$barcode}} " alt="barcode"   />
    </div>
</body>
</html>
