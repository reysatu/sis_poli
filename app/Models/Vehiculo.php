<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    use HasFactory;
    protected $table = 'vehiculo';

    public $timestamps = true;

    protected $primaryKey = 'idvehiculo';

    protected $keyType = 'string';

    // public $incrementing = false;

    protected $fillable = ['idvehiculo', 'marca','modelo', 'color'];
}
