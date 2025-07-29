<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Material::all();
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(StoreMaterialRequest $request)
{
    $validated = $request->validated();
    
    $material = Material::create($validated); 

    return response()->json([
        'message' => 'Material created successfully!', 
        'data' => $material
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Material $material)
    {
        return response()->json([
            'data'=>$material
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaterialRequest $request, Material $material)
    {
        $validated = $request->validated();

        $material->updated($validated);

        return response()->json([
            'message'=>'Material Update',
            'data'=> $material
        ], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        $material->delete();

        return response()->json([
            'message'=>'delete successfully!'
        ], 200 );
    }
}
