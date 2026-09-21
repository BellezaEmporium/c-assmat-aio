<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Payroll extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'payrolls';
    protected $fillable = ['user_id', 'child_id', 'employer_id', 'amount', 'date'];
}