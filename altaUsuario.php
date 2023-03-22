<?php
/**
 *	Script que se usa en los endpoints para trabajar con registros de la tabla PLAYER
 *	La clase "player.class.php" es la clase del modelo, que representa a un jugador de la tabla
*/
require_once 'src/response.php';
require_once 'src/classes/usuarios.class.php';

$usuario = new Usuarios();

/**
 * Se mira el tipo de petición que ha llegado a la API y dependiendo de ello se realiza una u otra accción
 */
switch ($_SERVER['REQUEST_METHOD']) {
	
	/**
	 * Si se recibe un POST, se comprueba si se han recibido parámetros y en caso afirmativo se usa el método insert() del modelo
	 */
	case 'POST':
		$params = json_decode(file_get_contents('php://input'), true);

		if(!isset($params)){
			$response = array(
				'result' => 'error',
				'details' => 'Error en la solicitud',
				'filtro' =>'no lo ha pasado' 
			);

			Response::result(400, $response);
			exit;
		}

        //hay que aplicar el hash md5 a la contraseña para guardarla en la base de datos
        $passMd5=md5($params['password']);
        $params["password"]=$passMd5;

		$user_id = $usuario->insert($params);

		$response = array(
			'result' => 'ok',
			'user_id' => $user_id
		);

		Response::result(201, $response);
		break;

	
	/**
	 * Para cualquier otro tipo de petición se devuelve un mensaje de error 404.
	 */
	default:
		$response = array(
			'result' => 'error'
		);

		Response::result(404, $response);

		break;
}
?>