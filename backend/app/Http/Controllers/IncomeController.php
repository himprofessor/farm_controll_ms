<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Requests\UpdateEquipmentRequest;
use App\Models\Income;
use Illuminate\Http\Request;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Income::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEquipmentRequest $request)
    {
        $validated = $request->validated();

        $income = Income::create($validated);

        return response()->json([
            'message' => 'Income created successfully',
            'data' => $income
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Income $income)
    {
        return response()->json([
            'data'=>$income
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEquipmentRequest $request, Income $income)
{
    $income->update($request->validated());

    return response()->json([
        'message' => 'Income updated successfully',
        'data' => $income
    ]);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Income $income)
    {
        $income->delete();
        return response()->json([
            'message'=>'Delete successfully..!'
        ], 200);
    }
}
