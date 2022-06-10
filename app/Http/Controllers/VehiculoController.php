<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Vehiculo;

class VehiculoController extends Controller
{
   
    public function index()
    {
        return response()->json(['status'=>'ok','data'=>Vehiculo::all()], 200);
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
