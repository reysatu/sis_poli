<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Especie;

class EspecieController extends Controller
{

    public function index()
    {
        return response()->json(['status'=>'ok','data'=>Especie::all()], 200);
    }
 
    public function store(Request $request)
    {
        return Especie::create($request->all());
    }
    public function getEspecie()
    {
        return response()->json(['status'=>'ok','data'=>Especie::all(['idespecie', 'especie','situacion', 'documento'])], 200);
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
