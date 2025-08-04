<?php

namespace App\Http\Controllers;

use App\Models\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|unique:auth,name',
            'password' => 'required|string|confirmed',
        ]);

        $auth = Auth::create([
            'name' => $fields['name'],
            'password' => bcrypt($fields['password']),
        ]);

        $token = $auth->createToken('apptoken')->plainTextToken;

        return response()->json([
            'auth' => $auth,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        $auth = Auth::where('name', $fields['name'])->first();

        if (!$auth || !Hash::check($fields['password'], $auth->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $auth->createToken('apptoken')->plainTextToken;

        return response()->json([
            'auth' => $auth,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function update(Request $request)
    {
        $auth = $request->user();

        $fields = $request->validate([
            'name' => 'sometimes|string|unique:auth,name,' . $auth->id,
            'password' => 'sometimes|string|confirmed',
        ]);

        if (isset($fields['name'])) $auth->name = $fields['name'];
        if (isset($fields['password'])) $auth->password = bcrypt($fields['password']);

        $auth->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'auth' => $auth,
        ]);
    }
}
