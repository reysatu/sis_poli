<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Comisaria;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\PDF;

class ComisariaController extends Controller
{

    public function index() 
    {
       
        $data_comisaria=Comisaria::all(['id', 'nom_comisaria',  'estado']);
        $apu = [];
        foreach ($data_comisaria as $item) { 
            $status_description='ACTIVO';
            if($item->estado=='I'){
                $status_description='INACTIVO';
            }
            $apu[] = [
                'id' => $item->id,
                'nom_comisaria' => $item->nom_comisaria,
                'estado' => $item->estado,
                'status_description'=> $status_description,
            ];

        }
        return response()->json(['status'=>'ok','data'=>$apu], 200);
    }

    // Reporte PDF
    public function indexComiPdf()
    {
        $comisaria = DB::table( 'comisaria' )
        ->get();
        $pdf = PDF::loadView('comisariaReporte', ['comisarias' => $comisaria]);
        return $pdf->stream();
    } 

  

    // ---------------------
    

    public function store(Request $request)
    {

        return Comisaria::create($request->all());
    }

    public function getComisaria()
    {
        return response()->json(['status'=>'ok','data'=>Comisaria::all(['id', 'nom_comisaria',  'estado'])], 200);
    }

    public function update(Request $request, $id)
    {
        $comisaria = Comisaria::findOrFail($id);
        $comisaria->update($request->all());
        return $comisaria;
    }

    public function destroy($id)
    {
      
        $comisaria = Comisaria::findOrFail($id);
        $comisaria->delete();
        return 204;
    }
}
