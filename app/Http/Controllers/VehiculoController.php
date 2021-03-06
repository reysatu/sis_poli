<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Vehiculo;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\PDF;

class VehiculoController extends Controller
{
   
    public function index()
    {

        $data_vehiculo=Vehiculo::all(['idvehiculo','clase','situacion', 'marca','modelo','placa', 'estado']);
        $apu = [];
        foreach ($data_vehiculo as $item) { 
            $status_description='ACTIVO';
            if($item->estado=='I'){
                $status_description='INACTIVO';
            }
            $apu[] = [
                'idvehiculo' => $item->idvehiculo,
                'clase' => $item->clase,
                'situacion' => $item->situacion,
                'marca' => $item->marca,
                'modelo' => $item->modelo,
                'placa' => $item->placa,
                'estado' => $item->estado,
                'status_description'=> $status_description,
            ];

        }
        return response()->json(['status'=>'ok','data'=>$apu], 200);
    }

    public function get_vehiculo_search()
    {
        $query_vehiculo=Vehiculo::all(['idvehiculo','clase','marca','modelo','placa','situacion']);
        $data_vehiculo = [];
        foreach ($query_vehiculo as $item) { 
            $data_vehiculo[] = [
                'idvehiculo'=>$item->idvehiculo,
                'full_name' =>$item->placa.'' .$item->clase.' '.$item->marca.' '.$item->modelo.''.$item->situacion,
            ];
        }
        return response()->json(['status'=>'ok','data'=>$data_vehiculo], 200);
    }

      // Reporte PDF
      public function indexVehiPdf(Request $request)
      {
          $data=$request->all();
          if (isset($data["search"])) {
              $text_search=$data["search"];
              $vehiculos = DB::table( 'vehiculo' )->where('clase', 'like', '%'.$text_search.'%')->get();
          }else{
              $vehiculos = DB::table( 'vehiculo' )->get();
          }
          $pdf = PDF::loadView('vehiculoReporte', ['vehiculos' => $vehiculos])->setPaper('a4', 'landscape');
          return $pdf->stream();
      } 
    
    public function store(Request $request)
    {
        return Vehiculo::create($request->all());
    }

    public function getPerfil()
    {
        return response()->json(['status'=>'ok','data'=>Vehiculo::all(['idvehiculo','clase', 'marca','modelo','placa','situacion', 'estado'])], 200);
    }

    public function update(Request $request, $id)
    {
        $vehiculo = Vehiculo::findOrFail($id);
        $vehiculo->update($request->all());
        return $vehiculo;
    }

   
    public function destroy($id)
    {
        $vehiculo = Vehiculo::findOrFail($id);
        $vehiculo->delete();
        return 204;
    }
}
