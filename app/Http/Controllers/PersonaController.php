<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Persona;

class PersonaController extends Controller
{

    public function index()
    {
        return response()->json(['status'=>'ok','data'=>Persona::all()], 200);
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
