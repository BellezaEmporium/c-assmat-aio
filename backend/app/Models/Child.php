<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Child extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'children';
    protected $fillable = ['user_id', 'name', 'birthdate', 'employer_id', 'notes'];

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }
}