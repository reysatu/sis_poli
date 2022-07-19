<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Vehiculo extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'vehiculo';

    public $timestamps = true;

    protected $primaryKey = 'idvehiculo';

    protected $keyType = 'string';

    // public $incrementing = false;

    protected $fillable = ['idvehiculo','clase','marca','modelo','placa','situacion','estado'];
}
