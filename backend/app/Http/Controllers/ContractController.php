<?php

namespace App\Http\Controllers;

use App\Models\Child;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Contract::where('contract_id', $request->user()->id)->get());
    }

    public function store(Request $request)
    {
        $contract = Contract::create([
            'contract_id' => $request->user()->id,
            'name' => $request->name,
            'child_id' => \App\Models\Child::where('child_id', $request->child_id)->findOrFail($request->child_id)->id,
            'employer_id' => \App\Models\Employer::where('employer_id', $request->employer_id)->findOrFail($request->employer_id)->id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'weekly_hours' => $request->weekly_hours,
            'hourly_rate' => $request->hourly_rate,
        ]);
        return response()->json($contract);
    }

    public function update(Request $request, $id)
    {
        $contract = Contract::where('contract_id', $request->user()->id)->findOrFail($id);
        $contract->update($request->only(['start_date','end_date','weekly_hours','hourly_rate']));
        return response()->json($contract);
    }

    public function destroy(Request $request, $id)
    {
        $contract = Contract::where('contract_id', $request->user()->id)->findOrFail($id);
        $contract->delete();
        return response()->json(['message' => 'Contract deleted successfully']);
    }
}
