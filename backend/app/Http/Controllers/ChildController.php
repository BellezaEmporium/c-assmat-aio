<?php

namespace App\Http\Controllers;

use App\Models\Child;
use Illuminate\Http\Request;

class ChildController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Child::where('child_id', $request->user()->id)->get());
    }

    public function store(Request $request)
    {
        $child = Child::create([
            'child_id' => $request->user()->id,
            'name' => $request->name,
            'birthdate' => $request->birthdate,
            'employer_id' => \App\Models\Employer::where('employer_id', $request->employer_id)->findOrFail($request->employer_id)->id,
            'notes' => $request->notes ?? ''
        ]);
        return response()->json($child);
    }

    public function update(Request $request, $id)
    {
        $child = Child::where('child_id', $request->user()->id)->findOrFail($id);
        $child->update($request->only(['name','birthdate','notes']));
        return response()->json($child);
    }

    public function destroy(Request $request, $id)
    {
        $child = Child::where('child_id', $request->user()->id)->findOrFail($id);
        $child->delete();
        return response()->json(['message' => 'Child deleted successfully']);
    }
}
