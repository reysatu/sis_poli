<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\models\Arma;

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

    public function get_arma_search()
    {
        $query_arma=Arma::all(['idarma','marca','modelo','calibre']);
        $data_arma = [];
        foreach ($query_arma as $item) { 
            $data_arma[] = [
                'idarma'=>$item->idarma,
                'full_name' => $item->marca.' '.$item->modelo.' '.$item->calibre,
            ];
        }
        return response()->json(['status'=>'ok','data'=>$data_arma], 200);
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
