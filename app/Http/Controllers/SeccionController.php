<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Seccion;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\PDF;

class SeccionController extends Controller
{

    public function index() 
    {
       
        $data_seccion= Seccion::all(['id', 'descripcion',  'estado']);
        $apu = [];
        foreach ($data_seccion as $item) { 
            $status_description='ACTIVO';
            if($item->estado=='I'){
                $status_description='INACTIVO';
            }
            $apu[] = [
                'id' => $item->id,
                'descripcion' => $item->descripcion,
                'estado' => $item->estado,
                'status_description'=> $status_description,
            ];

        }
        return response()->json(['status'=>'ok','data'=>$apu], 200);
    }

    // Reporte PDF
    public function indexSeccionPdf(Request $request)
    {
        $data=$request->all();
        if (isset($data["search"])) {
            $text_search=$data["search"];
            $seccions = DB::table( 'seccion' )->where('descripcion', 'like', '%'.$text_search.'%')->get();
        }else{
            $seccions = DB::table( 'seccion' )->get();
        }
        $pdf = PDF::loadView('seccionReporte', ['seccions' => $seccions])->setPaper('a4', 'landscape');
        return $pdf->stream();
    } 

  

    // ---------------------
    

    public function store(Request $request)
    {

        return Seccion::create($request->all());
    }

    public function getSeccion()
    {
        return response()->json(['status'=>'ok','data'=>Seccion::all(['id', 'descripcion',  'estado'])], 200);
    }

    public function update(Request $request, $id)
    {
        $seccion = Seccion::findOrFail($id);
        $seccion->update($request->all());
        return $seccion;
    }

    public function destroy($id)
    {
      
        $seccion = Seccion::findOrFail($id);
        $seccion->delete();
        return 204;
    }
}
