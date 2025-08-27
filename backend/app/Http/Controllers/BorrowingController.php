<?php

namespace App\Http\Controllers\Api;
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Material;
use App\Models\Staff;  
use App\Models\Borrowing;
use Illuminate\Http\Request;

class BorrowingController extends Controller
{
    public function index()
    {
        $borrowings = Borrowing::with(['material', 'staff'])->get();
        return response()->json($borrowings);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
            'purpose' => 'required|string|max:255',
            'borrowed_date' => 'required|date',
            'returned_date' => 'nullable|date|after_or_equal:borrowed_date',
            'material_name' => 'required|string|exists:materials,name',
            'staff_name' => 'required|string|exists:staff,name',
        ]);

        $material = Material::where('name', $request->material_name)->firstOrFail();
        $staff = Staff::where('name', $request->staff_name)->firstOrFail();

        // Subtract stock
        if ($material->currentStock < $validated['quantity']) {
            return response()->json(['message' => 'Not enough stock'], 400);
        }
        $material->currentStock -= $validated['quantity'];
        $material->save();

        $borrow = Borrowing::create([
            'quantity' => $validated['quantity'],
            'purpose' => $validated['purpose'],
            'borrowed_date' => $validated['borrowed_date'],
            'returned_date' => $validated['returned_date'] ?? null,
            'material_id' => $material->id,
            'staff_id' => $staff->id,
        ]);

        return response()->json([
            'message' => 'Borrow record created successfully',
            'borrow' => $borrow->load(['material', 'staff']),
            'material' => $material // Return updated material
        ], 201);
    }


    public function update(Request $request, $id)
    {
        $borrow = Borrowing::findOrFail($id);
        $validated = $request->validate([
            'returned_date' => 'nullable|date|after_or_equal:borrowed_date',
        ]);

        $borrow->update($validated);

        return response()->json([
            'message' => 'Borrow record updated successfully',
            'borrow' => $borrow->load(['material', 'staff']),
        ], 200);
    }

    public function destroy($id)
    {
        $borrow = Borrowing::findOrFail($id);
        $borrow->delete();

        return response()->json(['message' => 'Borrow record deleted successfully'], 200);
    }
}