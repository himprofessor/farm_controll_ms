<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
use Illuminate\Http\Request;

class BorrowingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Borrowing::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validated();

        $borrowing = Borrowing::create($validated);
        return response()->json([
            'message'=>'borrowing successfully.!',
            'data'=>$borrowing
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Borrowing $borrowing)
    {
        return response()->json([
            'data'=>$borrowing
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Borrowing $borrowing)
    {
        $validated = $request->validated();

        $borrowing->update($validated);
        return response()->json([
            'message'=>'update successfully.!',
            'data'=>$borrowing
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Borrowing $borrowing)
    {
        $borrowing->delete();
        return response()->json('delete successfully!');
    }
}
