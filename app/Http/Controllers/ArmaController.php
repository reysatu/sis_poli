<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\models\Arma;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\PDF;

class ArmaController extends Controller
{
   
    public function index() 
    {
        $data_arma=Arma::all(['idarma', 'marca', 'modelo', 'calibre', 'estado']);
        $apu = [];
        foreach ($data_arma as $item) { 
            $status_description='ACTIVO';
            if($item->estado=='I'){
                $status_description='INACTIVO';
            }
            $apu[] = [
                'idarma' => $item->idarma,
                'marca' => $item->marca,
                'modelo' => $item->modelo,  
                'calibre' => $item->calibre,
                'estado' => $item->estado,
                'status_description'=> $status_description,
            ];

        }
        return response()->json(['status'=>'ok','data'=>$apu], 200);
    }

       // Reporte PDF
       public function indexArmaPdf(Request $request)
       {
           $data=$request->all();
           if (isset($data["search"])) {
               $text_search=$data["search"];
               $armas = DB::table( 'arma' )->where('arma', 'like', '%'.$text_search.'%')->get();
           }else{
               $armas = DB::table( 'arma' )->get();
           }
           $pdf = PDF::loadView('armaReporte', ['armas' => $armas])->setPaper('a4', 'landscape');
           return $pdf->stream();
       } 

    
    public function store(Request $request)
    {
        return Arma::create($request->all()); 
    }

    public function getArma()
    {
        return response()->json(['status'=>'ok','data'=>Arma::all(['idarma', 'marca', 'modelo', 'calibre', 'estado'])], 200);
    }


    public function update(Request $request, $id)
    {
        $arma = Arma::findOrFail($id);
        $arma->update($request->all());
        return $arma;
    }

 
    public function destroy($id)
    {
        $arma = Arma::findOrFail($id);
        $arma->delete();
        return 204;
    }
}
