<?php

namespace App\Http\Controllers;

use App\Models\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'nullable|string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'user'
        ]);

        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ]);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Query User model, not Auth
        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->makeHidden(['password', 'remember_token']),
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
            'email' => 'sometimes|string|email|unique:auth,email,' . $auth->id,
            'password' => 'sometimes|string|confirmed',
        ]);

        if (isset($fields['name'])) $auth->name = $fields['name'];
        if (isset($fields['email'])) $auth->email = $fields['email'];
        if (isset($fields['password'])) $auth->password = bcrypt($fields['password']);

        $auth->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'auth' => $auth->makeHidden(['password', 'remember_token']),
        ]);
    }
}