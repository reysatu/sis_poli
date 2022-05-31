<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\models\Arma;

class ArmaController extends Controller
{
   
    public function index() 
    {
        return response()->json(['status'=>'ok','data'=>Arma::all()], 200);
    }

    
    public function store(Request $request)
    {
        return Arma::create($request->all());
    }

    public function getArma()
    {
        return response()->json(['status'=>'ok','data'=>Arma::all(['idarma', 'marca', 'modelo', 'anio_fabricacion'])], 200);
    }


    public function update(Request $request, $id)
    {
        $arma = Arma::findOrFail($id);
        $arma->update($request->all());
        return $arma;
    }

 
    public function destroy($id)
    {
        $arma = Arma::findOrFail($id);
        $arma->delete();
        return 204;
    }
}
