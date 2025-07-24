<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaterialPurchaseRequest;
use App\Models\MaterialPurchase;
use Illuminate\Http\Request;

class MaterialPurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MaterialPurchase::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaterialPurchaseRequest $request)
    {
        $validated = $request->validated();
         $validated['total_cost'] = $validated['quantity'] * $validated['price_per_unit'];

        $material_pur = MaterialPurchase::create($validated);

        return response()->json([
            'message'=> 'material create successully..!',
            'data'=>$material_pur
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MaterialPurchase $materialPurchase)
    {
        return response()->json([
            'message' => 'Material found!',
            'data' => $materialPurchase
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MaterialPurchase $materialPurchase)
    {
        $materialPurchase->delete();

        return response()->json([
            'message' => 'Material deleted successfully.'
        ], 200);
    }
}
