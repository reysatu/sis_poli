<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especie extends Model
{
    use HasFactory;
    protected $table = 'especie';

    public $timestamps = true;

    protected $primaryKey = 'id_especie';

    protected $keyType = 'string';

    // public $incrementing = false;

    protected $fillable = ['id_especie', 'tipo_especie','situacion', 'tipo_document	'];
}
