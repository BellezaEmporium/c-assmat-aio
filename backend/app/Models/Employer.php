<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Employer extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'employers';
    protected $fillable = ['user_id', 'name', 'surname', 'pajemploi_id', 'address', 'phone', 'email', 'notes'];
}
