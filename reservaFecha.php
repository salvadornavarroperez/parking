<?php
/**
 *	Script que se usa en los endpoints para trabajar con registros de la tabla reserva
 *	La clase "reserva.class.php" es la clase del modelo, que representa a un jugador de la tabla
*/
require_once 'src/response.php';
require_once 'src/classes/reservas.class.php';
include_once 'cors.php';
$reserva = new Reservas();

/**
 * Se mira el tipo de petición que ha llegado a la API y dependiendo de ello se realiza una u otra accción
 */
switch ($_SERVER['REQUEST_METHOD']) {
	/**
	 * Si se ha recibido un GET se llama al método get() del modelo y se le pasan los parámetros recibidos por GET en la petición
	 */
	case 'GET':
		$params = $_GET;

		$reserva = $reserva->getReservas($params['fechaE'], $params['fechaS']);

		$response = array(
			'result' => 'ok',
			'reserva' => $reserva
		);

        
		Response::result(200, $response);
		break;		
}
?>