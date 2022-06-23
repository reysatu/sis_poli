<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\ComiPdf;
use App\Models\Reporte;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\PDF;
// use Barryvdh\DomPDF\Facade as PDF;



class PdfController extends Controller
{

    // public function index(Request $request)
    // {
    //     $idreporte = $request->get('idreporte');
    //     $descripcion = $request->get('descripcion');

    //     $reportes = ComiPdf::ordenBy('id', 'DESC')
    //     ->where();
    // }


   

    public function indexPdf()
    {

    //     // $reportes = Pdfs::all()
     //     // $pdf = PDF::loadView('reporte', ['reportes' => $reportes])->setPaper('a4', 'landscape')->setWarnings(false);

    //     // return response()->streamDownload(function () use ($pdf) {
    //     //     echo $pdf->output();
    //     // }, 'reporte.pdf');


            
        $reportes = DB::table( 'reporte' )
        // ->where('descripcion', 'like', '%'.$this->search.'%')
        ->get();   
        $pdf = PDF::loadView('reporte', ['reportes' => $reportes]);
        return $pdf->stream();
    }



  
}
