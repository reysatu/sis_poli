<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Arma extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'arma';

    public $timestamps = true;

    protected $primaryKey = 'idarma';

    protected $keyType = 'string';

    // public $incrementing = false;

    protected $fillable = ['idarma', 'marca', 'modelo', 'calibre', 'estado'];
}