<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Expense::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpenseRequest $request)
    {
        $validated = $request->validated();

        $Expense = Expense::create($validated);
        return response()->json([
            'message'=>'expense create successfully!',
            'data'=> $Expense
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $Expense)
    {
        return response()->json([
            'data'=>$Expense
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpenseRequest $request, Expense $Expense)
    {
        
        $validated = $request->validated();
        $Expense->update($validated);

        return response()->json([
            'message'=> 'expense update successfully.!',
            'data'=>$Expense
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $Expense)
    {
        $Expense->delete();
        return response()->json([
            'message'=> 'delete Success.!'
        ], 200);
    }
}
