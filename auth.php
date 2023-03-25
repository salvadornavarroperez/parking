<?php
/**
 * Clase que hace de endpoint para la autentificación
 * Se debe mandar por POST un json con el usuario y la contraseña
 */
require_once 'src/classes/auth.class.php';
require_once 'src/response.php';
require_once 'src/classes/usuarios.class.php';

$auth = new Authentication();
$usuario=new Usuarios();

switch ($_SERVER['REQUEST_METHOD']) {
	case 'POST':
		$user = json_decode(file_get_contents('php://input'), true);
		
		//codigo nuevo
		$params=array("Correo"=>$user['Correo']);
		$resultados=$usuario->get($params);

		//hasta aqui

		$token = $auth->signIn($user);

		$response = array(
			'result' => 'ok',
			'token' => $token,
			'Id_usuario'=>$resultados[0]['Id_usuario'],
			'Nombre'=>$resultados[0]['Nombre'],
			'Correo'=>$resultados[0]['Correo'],
			'rol'=>$resultados[0]['rol']

			
		);

		Response::result(201, $response);

		break;
}
?>