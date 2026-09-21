<?php

namespace App\Http\Controllers;

use App\Models\Planning;
use Illuminate\Http\Request;

class PlanningController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Planning::where('id', $request->user()->id)->get());
    }
}
