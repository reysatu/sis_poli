<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Vehiculo;

class VehiculoController extends Controller
{
   
    public function index()
    {

        $data_vehiculo=Vehiculo::all(['idvehiculo','clase','situacion', 'marca','modelo', 'estado']);
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
                'estado' => $item->estado,
                'status_description'=> $status_description,
            ];

        }
        return response()->json(['status'=>'ok','data'=>$apu], 200);
    }

    
    public function store(Request $request)
    {
        return Vehiculo::create($request->all());
    }

    public function getPerfil()
    {
        return response()->json(['status'=>'ok','data'=>Vehiculo::all(['idvehiculo','clase','situacion', 'marca','modelo', 'estado'])], 200);
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
