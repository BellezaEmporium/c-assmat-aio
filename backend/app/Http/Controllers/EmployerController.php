<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\Employer;
use Illuminate\Http\Request;

class EmployerController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Employer::where('employer_id', $request->user()->id)->get());
    }

    public function store(Request $request)
    {
        $employer = Employer::create([
            'employer_id' => $request->user()->id,
            'name' => $request->name,
            'birthdate' => $request->birthdate,
            'pajemploi_id' => $request->notes ?? ''
        ]);
        return response()->json($employer);
    }

    public function update(Request $request, $id)
    {
        $employer = Employer::where('employer_id', $request->user()->id)->findOrFail($id);
        $employer->update($request->only(['name','birthdate','pajemploi_id']));
        return response()->json($employer);
    }

    public function destroy(Request $request, $id)
    {
        $employer = Employer::where('employer_id', $request->user()->id)->findOrFail($id);
        $employer->delete();
        return response()->json(['message' => 'Employer deleted successfully']);
    }
}
