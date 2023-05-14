<?php
/**
 *	Script que se usa en los endpoints para trabajar con registros de la tabla tarifas
 *	La clase "tarifa.class.php" es la clase del modelo, que representa a una tarifa de la tabla
*/
require_once 'src/response.php';
require_once 'src/classes/tarifas.class.php';
include_once 'cors.php';
$tarifa = new tarifas();

/**
 * Se mira el tipo de petición que ha llegado a la API y dependiendo de ello se realiza una u otra accción
 */
switch ($_SERVER['REQUEST_METHOD']) {
	/**
	 * Si se ha recibido un GET se llama al método get() del modelo y se le pasan los parámetros recibidos por GET en la petición
	 */
	case 'GET':
		$params = $_GET;

		$tarifas = $tarifa->get($params);

		$response = array(
			'result' => 'ok',
			'tarifas' => $tarifas
		);

		Response::result(200, $response);
		break;
		
	/**
	 * Si se recibe un POST, se comprueba si se han recibido parámetros y en caso afirmativo se usa el método insert() del modelo
	 */
	case 'POST':
		$params = json_decode(file_get_contents('php://input'), true);

		if(!isset($params)){
			$response = array(
				'result' => 'error',
				'details' => 'Error en la solicitud'
			);

			Response::result(400, $response);
			exit;
		}

		$insert_id = $tarifa->insert($params);

		$response = array(
			'result' => 'ok',
			'fecha' => $insert_id
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