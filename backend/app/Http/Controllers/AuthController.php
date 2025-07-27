<?php

namespace App\Http\Controllers;

<<<<<<< HEAD
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
=======
use App\Models\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
>>>>>>> 35d2ca88b3636045e623314f506fa0d26581854e

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
<<<<<<< HEAD
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'name' => $fields['name'],
=======
            'role' => 'required|in:admin',
            'email' => 'required|string|email|unique:auth,email',
            'password' => 'required|string|confirmed',
        ]);

        $auth = Auth::create([
            'name' => $fields['name'],
            'role' => $fields['role'],
>>>>>>> 35d2ca88b3636045e623314f506fa0d26581854e
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);

<<<<<<< HEAD
        $token = $user->createToken('apptoken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
=======
        $token = $auth->createToken('apptoken')->plainTextToken;

        return response()->json([
            'auth' => $auth,
            'token' => $token,
        ], 201);
>>>>>>> 35d2ca88b3636045e623314f506fa0d26581854e
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

<<<<<<< HEAD
        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('apptoken')->plainTextToken;

        return response()->json([
            'user' => $user,
=======
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
>>>>>>> 35d2ca88b3636045e623314f506fa0d26581854e
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }
<<<<<<< HEAD
=======

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
>>>>>>> 35d2ca88b3636045e623314f506fa0d26581854e
}
