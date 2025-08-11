<?php

namespace App\Http\Controllers\Api;
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use Illuminate\Http\Request;

class BorrowingController extends Controller
{
    // Return all borrowing records
    public function index()
    {
        $borrows = Borrowing::all();
        return response()->json($borrows);
    }

    // Store a new borrowing record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
            'purpose' => 'required|string|max:255',
            'borrowed_date' => 'required|date',
            'retunred_date' => 'nullable|date|after_or_equal:borrowed_date',
            'material_id' => 'required|exists:materials,id',
            'staff_id' => 'required|exists:staffs,id',
        ]);

        $borrow = Borrowing::create($validated);

        return response()->json([
            'message' => 'Borrow record created successfully',
            'borrow' => $borrow,
        ], 201);
    }
}
