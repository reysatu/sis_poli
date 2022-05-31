<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arma extends Model
{
    use HasFactory;
    protected $table = 'arma';

    public $timestamps = true;

    protected $primaryKey = 'idarma';

    protected $keyType = 'string';

    // public $incrementing = false;

    protected $fillable = ['idarma', 'marca', 'modelo', 'anio_fabricacion'];
}