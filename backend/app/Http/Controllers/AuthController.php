<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Auth;
use Illuminate\Support\Facades\Auth as FacadeAuth;

class AuthController extends Controller
{
    /**
     * Register a new admin
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:auth,name',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = \App\Models\Auth::create([
            'name' => $request->name,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Registration successful',
            'token' => $token,
        ], 201);
    }

    /**
     * Login an existing admin
     */
    public function login(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = \App\Models\Auth::where('name', $request->name)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Login successful',
            'token' => $token,
        ], 200);
    }

    /**
     * Logout current admin (invalidate token)
     */
    public function logout(Request $request)
    {
        // For Sanctum: deletes the token of the current session
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Logged out',
        ]);
    }
}
