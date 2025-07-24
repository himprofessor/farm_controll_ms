<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use App\Http\Requests\StoreSalaryRequest;
use App\Http\Requests\UpdateSalaryRequest;

class SalaryController extends Controller
{
    /**
     * Display a list of salaries with user info.
     */
    public function index()
    {
        return Salary::with('user')->get();
    }

    /**
     * Store a new salary record.
     */
    public function store(StoreSalaryRequest $request)
    {
        $salary = Salary::create($request->validated());

        return response()->json($salary, 201);
    }

    /**
     * Update an existing salary record.
     */
    public function update(UpdateSalaryRequest $request, $id)
    {
        $salary = Salary::findOrFail($id);
        $salary->update($request->validated());

        return response()->json($salary);
    }

    /**
     * Delete a salary record.
     */
    public function destroy($id)
    {
        $deleted = Salary::destroy($id);

        return response()->json([
            'message' => $deleted ? 'Deleted successfully' : 'Delete failed',
            'deleted' => $deleted,
        ]);
    }
}
