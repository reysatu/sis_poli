<!DOCTYPE html>
<html lang="en">
<head>
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        h1 {
            text-align: center;
        }

        #customers {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #customers td,
        #customers th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #customers tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        #customers tr:hover {
            background-color: #ddd;
        }

        #customers th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #04AA6D;
            color: white;
        }

    </style>
</head>
<body>
    <h1>Reporte de prueba 001</h1>
    <table id="customers">
            <tr>
                <th>id</th>
                <th>descripcion</th>
            </tr>

            @foreach ($reportes as $reporte)
                <tr>
                    <td>{{ $reporte->idreporte }}</td>
                    <td>{{$reporte->descripcion}}</td>
                </tr>
            @endforeach
    </table>

</body>
</html>