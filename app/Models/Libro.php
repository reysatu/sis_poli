<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Libro extends Model
{
    use HasFactory;

    protected $table = 'libro';

    public $timestamps = true;
 
    protected $primaryKey = 'id';

    protected $keyType = 'string';

    // public $incrementing = false;

    protected $fillable = ['id','idseccion', 'descripcion',  'estado'];
}
