<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Pdfs;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\PDF;
// use Barryvdh\DomPDF\Facade as PDF;



class PdfController extends Controller
{

    public function indexPdf()
    {

        $reportes = DB::table( 'reporte' )->get();
        // $pdf = PDF::loadView('reporte', ['reportes' => $reportes])->setPaper('a4', 'landscape')->setWarnings(false);

        // return response()->streamDownload(function () use ($pdf) {
        //     echo $pdf->output();
        // }, 'reporte.pdf');
        $pdf = PDF::loadView('reporte', ['reportes' => $reportes]);
        return $pdf->stream();
    }

    public function indexComiPdf()
    {

        $comisaria = DB::table( 'comisarias' )->get();
        $pdf = PDF::loadView('comisariaReporte', ['comisaria' => $comisaria]);
        return $pdf->stream();
    }
}
