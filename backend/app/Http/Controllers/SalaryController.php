<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSalaryRequest;
use App\Http\Requests\UpdateSalaryRequest;
use App\Models\Salary;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SalaryController extends Controller
{
    /**
     * Display all salaries.
     */
    public function index()
    {
        return response()->json(Salary::with('user')->latest()->get(), 200);
    }

    /**
     * Store a new salary record.
     */
    public function store(StoreSalaryRequest $request)
    {
        $validated = $request->validated();

        $validated['paid_amount'] = $validated['paid_amount'] ?? 0;

        // Auto-determine status if not given
        if (!isset($validated['status'])) {
            $validated['status'] = $validated['paid_amount'] >= $validated['base_salary']
                ? 'paid'
                : ($validated['paid_amount'] > 0 ? 'pending' : 'unpaid');
        }

        $salary = Salary::create($validated);

        return response()->json([
            'message' => 'Salary record created successfully.',
            'data' => $salary
        ], 201);
    }

    /**
     * Display a specific salary record.
     */
    public function show(Salary $salary)
    {
        return response()->json([
            'message' => 'Salary details',
            'data' => $salary->load('user')
        ], 200);
    }

    /**
     * Update salary record (e.g. change status, correct amount).
     */
    public function update( UpdateSalaryRequest $request, Salary $salary)
    {
        $validated = $request->validated();

        $salary->fill($validated);

        // Auto-update status if paid_amount or base_salary was changed
        if (isset($validated['paid_amount']) || isset($validated['base_salary'])) {
            $salary->status = $salary->paid_amount >= $salary->base_salary
                ? 'paid'
                : ($salary->paid_amount > 0 ? 'pending' : 'unpaid');
        }

        $salary->save();

        return response()->json([
            'message' => 'Salary updated successfully.',
            'data' => $salary
        ], 200);
    }

    /**
     * Delete salary record.
     */
    public function destroy(Salary $salary)
    {
        $salary->delete();

        return response()->json([
            'message' => 'Salary deleted successfully.'
        ], 200);
    }

    /**
     * Pay salary partially or fully.
     */
    public function pay(Request $request, Salary $salary)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        $salary->paid_amount += $validated['amount'];

        // Update status based on new total paid
        $salary->status = $salary->paid_amount >= $salary->base_salary
            ? 'paid'
            : ($salary->paid_amount > 0 ? 'pending' : 'unpaid');

        $salary->save();

        return response()->json([
            'message' => 'Salary payment processed.',
            'data' => $salary
        ], 200);
    }
}
