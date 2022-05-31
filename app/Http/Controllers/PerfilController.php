<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Perfil;
class PerfilController extends Controller
{
   
    public function index()
    {
        return response()->json(['status'=>'ok','data'=>Perfil::all()], 200);
    }
    
    public function store(Request $request)
    {
        return Perfil::create($request->all());
    }

    public function getPerfil()
    {
        return response()->json(['status'=>'ok','data'=>Perfil::all(['idperfil', 'descripcion'])], 200);
    }

    public function edit($id)
    {
        //
    } 

    public function update(Request $request, $id)
    {
        $perfil = Perfil::findOrFail($id);
        $perfil->update($request->all());
        return $perfil;
    }

    public function destroy($id)
    {
        $perfil = Perfil::findOrFail($id);
        $perfil->delete();
        return 204;
    }
}
