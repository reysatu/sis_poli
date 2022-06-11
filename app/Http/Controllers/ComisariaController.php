<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Comisaria;

class ComisariaController extends Controller
{

    public function index() 
    {
       
        return response()->json(['status'=>'ok','data'=>Comisaria::all()], 200);
    }

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
