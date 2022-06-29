<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\ComiPdf;
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


   

    public function indexPdf(Request $request)
    {
        $data=$request->all();
        $reportes;
        if (isset($data["search"])) {
            $text_search=$data["search"];
            $reportes = DB::table( 'reporte' )->where('descripcion', 'like', '%'.$text_search.'%')->get();
        }else{
            $reportes = DB::table( 'reporte' )->get();
        }
        $pdf = PDF::loadView('reporte', ['reportes' => $reportes]);
        return $pdf->stream();
    }



  
}
