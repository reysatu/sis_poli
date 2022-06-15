<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Reporte;
use Illuminate\Support\Facades\DB; 
use Barryvdh\DomPDF\Facade\Pdf;

class PdfController extends Controller
{
   
    public function indexPdf()
    {
       $reportes = DB::table('reporte')->get();
       $pdf = PDF::loadView('reporte', ['reportes' => $reportes]);
       return $pdf->stream();
      
    }
    
}
