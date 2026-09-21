<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use function response;

class AuthController extends Controller
{
    public function me(Request $request)
    {
        return response()->json(Auth::user());
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();

            return response()->json([
                'user' => Auth::user(),
                'message' => 'Connecté avec succès',
            ]);
        }

        throw ValidationException::withMessages([
            'message' => ['Les identifiants fournis sont incorrects.'],
        ]);
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Déconnecté avec succès',
        ]);
    }
}