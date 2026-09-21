<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Contract extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'contracts';
    protected $fillable = ['user_id', 'child_id', 'employer_id', 'start_date', 'end_date', 'pays_food'];
}