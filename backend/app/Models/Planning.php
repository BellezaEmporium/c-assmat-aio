<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Planning extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'plannings';
    protected $fillable = ['user_id', 'child_id', 'date', 'start_time', 'end_time', 'notes'];

    public function child()
    {
        return $this->belongsTo(Child::class);
    }
}