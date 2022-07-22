<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Especie;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\PDF;

class EspecieController extends Controller
{

    public function index()
    {
        $data_especie=Especie::all(['idespecie', 'especie', 'documento','codigoDoc','situacion','estado']);
        $apu = [];
        foreach ($data_especie as $item) { 
            $status_description='ACTIVO';
            if($item->estado=='I'){
                $status_description='INACTIVO';
            }
            $apu[] = [
                'idespecie' => $item->idespecie,
                'especie' => $item->especie,
                'documento' => $item->documento,
                'codigoDoc' => $item->codigoDoc,
                'situacion' => $item->situacion,
                'estado' => $item->estado,
                'status_description'=> $status_description,
            ];
        }
        return response()->json(['status'=>'ok','data'=>$apu], 200);
        
    }

    public function get_especie_search()
    {
        $query_especie=Especie::all(['idespecie','especie','documento', 'codigoDoc','situacion']);
        $data_especie = [];
        foreach ($query_especie as $item) { 
            $data_especie[] = [
                'idespecie'=>$item->idespecie,
                'full_name' =>$item->codigoDoc.'-'.$item->especie.' - '.$item->situacion.' - '.$item->documento,
            ];
        }
        return response()->json(['status'=>'ok','data'=>$data_especie], 200);
    }

      // Reporte PDF
    public function indexEspePdf(Request $request)
    {
        $data=$request->all();
        if (isset($data["search"])) {
            $text_search=$data["search"];
            $especies = DB::table( 'especie' )->where('especie', 'like', '%'.$text_search.'%')->get();
        }else{
            $especies = DB::table( 'especie' )->get();
        }
        $pdf = PDF::loadView('especieReporte', ['especies' => $especies])->setPaper('a4', 'landscape');
        return $pdf->stream();
    } 
 
    public function store(Request $request)
    {
        return Especie::create($request->all());
    }
    public function getEspecie()
    {
        return response()->json(['status'=>'ok','data'=>Especie::all(['idespecie', 'especie','documento','codigoDoc','situacion', 'estado'])], 200);
    }

    public function update(Request $request, $id)
    {
        $especie = Especie::findOrFail($id);
        $especie->update($request->all());
        return $especie;
    }

  
    public function destroy($id)
    {
        $especie = Especie::findOrFail($id);
        $especie->delete();
        return 204;
    }
}
