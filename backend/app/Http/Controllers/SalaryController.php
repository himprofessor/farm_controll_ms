<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salary;

class SalaryController extends Controller
{
    // GET all salaries
    public function index()
    {
        return Salary::all();
        // try {
        //     $salaries = Salary::with('staff')->get(); // Assuming a staff relationship
        //     return response()->json([
        //         'success' => true,
        //         'data' => $salaries
        //     ]);
        // } catch (\Exception $e) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Failed to fetch salaries',
        //         'error' => $e->getMessage()
        //     ], 500);
        // } 
    }
    public function store(Request $request)
    {
        $request->validate([
            'staff_id' => 'required|exists:staff,id',
            'base_salary' => 'required|numeric|min:0',
            'current_balance' => 'required|numeric',
            'total_Earned' => 'required|numeric',
            'last_payment_date' => 'required|date',
        ]);

        try {
            $salary = Salary::create([
                'staff_id' => $request->staff_id,
                'base_salary' => $request->base_salary,
                'current_balance' => $request->current_balance,
                'total_Earned' => $request->total_Earned,
                'last_payment_date' => $request->last_payment_date,
            ]);

            return response()->json([
                'success' => true,
                'data' => $salary
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create salary record.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function show(Salary $salary)
    {
        return response()->json([
            'data' => $salary
        ]);
    }
}
