<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    public function index()
    {
        $staffs = Staff::all();

        if ($staffs->isEmpty()) {
            return response()->json([
                'message' => 'No staff found.',
                'data' => []
            ], 200);
        }

        return response()->json([
            'message' => 'Staff list retrieved successfully.',
            'data' => $staffs
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:staff,phone',
            'role' => 'required|in:manager,worker',
        ]);

        if (!empty($validated['phone'])) {
            $validated['phone'] = Hash::make($validated['phone']);
        }

        $staff = Staff::create($validated);

        return response()->json([
            'message' => 'Staff created successfully!',
            'data' => $staff
        ], 201);
    }

    public function show(Staff $staff)
    {
        return response()->json([
            'message' => 'Staff found!',
            'data' => $staff
        ], 200);
    }

    public function update(Request $request, Staff $staff)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|unique:staff,phone,' . $staff->id,
            'role' => 'sometimes|in:manager,worker',
        ]);

        if (isset($validated['phone']) && !empty($validated['phone'])) {
            $validated['phone'] = Hash::make($validated['phone']);
        }

        $staff->update($validated);

        return response()->json([
            'message' => 'Staff updated successfully!',
            'data' => $staff
        ], 200);
    }

    public function destroy(Staff $staff)
    {
        $staff->delete();

        return response()->json([
            'message' => 'Staff deleted successfully.'
        ], 200);
    }
}
