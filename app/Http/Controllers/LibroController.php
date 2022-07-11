<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Libro;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\PDF;

class LibroController extends Controller
{

    public function index() 
    {
       
        $data_libro=Libro::all(['id','idseccion', 'descripcion',  'estado']);
        $apu = [];
        foreach ($data_libro as $item) { 
            $status_description='ACTIVO';
            if($item->estado=='I'){
                $status_description='INACTIVO';
            }
            $apu[] = [
                'id' => $item->id,
                'idseccion' => $item->idseccion,
                'descripcion' => $item->descripcion,
                'estado' => $item->estado,
                'status_description'=> $status_description,
            ];

        }
        return response()->json(['status'=>'ok','data'=>$apu], 200);
    }

    // Reporte PDF
    public function indexLibroPdf(Request $request)
    {
        $data=$request->all();
        if (isset($data["search"])) {
            $text_search=$data["search"];
            $libros = DB::table( 'libro' )->where('descripcion', 'like', '%'.$text_search.'%')->get();
        }else{
            $libros = DB::table( 'libro' )->get();
        }
        $pdf = PDF::loadView('libroReporte', ['libros' => $libros])->setPaper('a4', 'landscape');
        return $pdf->stream();
    } 

  

    // ---------------------
    

    public function store(Request $request)
    {

        return Libro::create($request->all());
    }

    public function getLibro()
    {
        return response()->json(['status'=>'ok','data'=>Libro::all(['id','idseccion', 'descripcion',  'estado'])], 200);
    }

    public function update(Request $request, $id)
    {
        $libro = Libro::findOrFail($id);
        $libro->update($request->all());
        return $libro;
    }

    public function destroy($id)
    {
      
        $libro = Libro::findOrFail($id);
        $libro->delete();
        return 204;
    }
}
