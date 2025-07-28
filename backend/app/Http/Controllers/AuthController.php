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
            'name' => 'required|string',
            'role' => 'required|in:admin',
            'email' => 'required|string|email|unique:auth,email',
            'password' => 'required|string|confirmed',
        ]);

        $auth = Auth::create([
            'name' => $fields['name'],
            'role' => $fields['role'],
            'email' => $fields['email'],
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
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $auth = Auth::where('email', $fields['email'])->first();

        if (!$auth || !Hash::check($fields['password'], $auth->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if ($auth->role !== 'admin') {
            return response()->json(['message' => 'Access denied. Admins only.'], 403);
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

        if ($auth->role !== 'admin') {
            return response()->json(['message' => 'Only admins can update profile'], 403);
        }

        $fields = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|string|email|unique:auth,email,' . $auth->id,
            'password' => 'sometimes|string|confirmed',
        ]);

        if (isset($fields['name'])) $auth->name = $fields['name'];
        if (isset($fields['email'])) $auth->email = $fields['email'];
        if (isset($fields['password'])) $auth->password = bcrypt($fields['password']);

        $auth->save();

        return response()->json([
            'message' => 'Admin profile updated successfully',
            'auth' => $auth,
        ]);
    }
}
