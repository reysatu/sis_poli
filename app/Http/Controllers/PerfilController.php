<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Perfil;
use App\models\Permiso;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\PDF;
class PerfilController extends Controller
{
   
    public function index()
    {
        $data_perfil=Perfil::all(['idperfil', 'descripcion',  'estado']);
        $list_perfil = [];
        foreach ($data_perfil as $item) { 
            $status_description='ACTIVO';
            if($item->estado=='I'){
                $status_description='INACTIVO';
            }
            $list_perfil[] = [
                'idperfil' => $item->idperfil,
                'descripcion' => $item->descripcion,
                'estado' => $item->estado,
                'status_description'=> $status_description,
            ];

        }
        return response()->json(['status'=>'ok','data'=>$list_perfil], 200);
    }

      // Reporte PDF
      public function indexPerfilPdf(Request $request)
      {
          $data=$request->all();
          if (isset($data["search"])) {
              $text_search=$data["search"];
              $perfils = DB::table( 'perfil' )->where('name', 'like', '%'.$text_search.'%')->get();
          }else{
              $perfils = DB::table( 'perfil' )->get();
          }
          $pdf = PDF::loadView('perfilReporte', ['perfils' => $perfils]);
          return $pdf->stream();
      } 

    
    public function store(Request $request)
    {   $data=$request->all();
        $modules=$data["modules"];
        $new_perfil=Perfil::create($request->all());
        $perfil_created = Perfil::latest('idperfil')->first();
        foreach ($modules as $module){
            $new_permiso = Permiso::create(
                ['idperfil' => $perfil_created['idperfil'], 'idmodulo' =>$module['idmodulo']]
            );
        }
        return ($new_perfil);
    }

    public function getPerfil()
    {
        return response()->json(['status'=>'ok','data'=>Perfil::all(['idperfil', 'descripcion','estado'])], 200);
    }

    public function edit($id)
    {
        return response()->json(['status'=>'ok','data'=>Permiso::whereNull('deleted_at')->where('idperfil',$id)->select("idmodulo")->get()], 200);
    } 

    public function update(Request $request, $id)
    {   
        $data=$request->all();
        $modules=$data["modules"];
        $perfil = Perfil::findOrFail($id);
        $perfil->update($request->all());
        Permiso::where('idperfil',$id)->delete();
        foreach ($modules as $module){
            $new_permiso = Permiso::create(
                ['idperfil' =>  $id, 'idmodulo' =>$module['idmodulo']]
            );
        }
        return $perfil;
    }

    public function destroy($id)
    {
        $perfil = Perfil::findOrFail($id);
        Permiso::where('idperfil',$id)->delete();
        $perfil->delete();
        return 204;
    }
}
