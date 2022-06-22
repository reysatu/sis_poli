<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Persona extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'persona';
    protected $primaryKey = 'idpersona';

    protected $fillable = [ 
        'dni',
        'nombre',
        'ap_paterno',
        'ap_materno',
        'edad',
        'nacimiento',
        'sexo',
        'celular',
        'estado_civil',
        'situacion',

    ];
    public $timestamps = true;
 
}
