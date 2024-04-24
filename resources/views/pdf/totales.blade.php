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
                    <strong>Inicio:</strong>
                </td>
                <td>
                   {{$datos["fechas"]["inicio"]}}
                </td>

            </tr>
            <tr>
                <td>
                    <strong>Fin:</strong>
                </td>
                <td>
                    {{$datos["fechas"]["fin"]}}
                </td>

            </tr>
        </tbody>
    </table>

     <table style="width: 100%; margin-top:15px;">
        <tbody>
            <tr>
                <td>
                    <strong>Articulos:</strong>
                </td>
                <td >
                    {{$datos["totales"]["articulos"]}}
                </td>
            </tr>

            <tr>
                <td>
                    <strong>Subtotal:</strong>
                </td>
                <td>
                    Q{{$datos["totales"]["subtotal"]}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Descuentos:</strong>
                </td>
                <td>
                     Q{{$datos["totales"]["descuento"]}}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Total:</strong>
                </td>
                <td>
                     Q{{$datos["totales"]["total"]}}
                </td>
            </tr>
            <hr>
             <tr>
                <td>
                    <strong>Costos:</strong>
                </td>
                <td>
                     Q{{$datos["totales"]["costos"]}}
                </td>
            </tr>
             <tr>
                <td>
                    <strong>Ganancias:</strong>
                </td>
                <td>
                     Q{{$datos["totales"]["ganancias"]}}
                </td>
            </tr>
        </tbody>
    </table>

</body>
</html>
