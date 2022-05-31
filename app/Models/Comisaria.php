<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comisaria extends Model
{
    use HasFactory;

    protected $table = 'comisarias';

    public $timestamps = true;
 
    protected $primaryKey = 'id';

    protected $keyType = 'string';

    // public $incrementing = false;

    protected $fillable = ['id', 'nom_comisaria','auditoria','estado'];
}
