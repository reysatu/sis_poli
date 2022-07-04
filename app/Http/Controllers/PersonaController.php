<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Persona;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\PDF;

class PersonaController extends Controller
{

    public function index()
    {
        return response()->json(['status'=>'ok','data'=>Persona::all()], 200);
    }

     // Reporte PDF
     public function indexPersonPdf(Request $request)
     {
         $data=$request->all();
         if (isset($data["search"])) {
             $text_search=$data["search"];
             $personas = DB::table( 'persona' )->where('dni', 'like', '%'.$text_search.'%')->get();
         }else{
             $personas = DB::table( 'persona' )->get();
         }
         $pdf = PDF::loadView('personReporte', ['personas' => $personas])->setPaper('a4', 'landscape');
         return $pdf->stream();
     } 


    public function store(Request $request)
    {
        return Persona::create($request->all());
    }
 
    public function getPersona()
    {
        return response()->json(['status'=>'ok','data'=>Persona::all(['dni',
        'nombre',
        'ap_paterno',
        'ap_materno',
        'edad',
        'nacimiento',
        'sexo',
        'celular',
        'estado_civil',
        'situacion',])], 200);
    }


    public function update(Request $request, $id)
    {
        $persona = Persona::findOrFail($id);
        $persona->update($request->all());
        return $persona;
    }

 
    public function destroy($id)
    { 
        $persona = Persona::findOrFail($id);
        $persona->delete();
        return 204;
    }
}
