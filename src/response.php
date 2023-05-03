<?php
/**
 * Clase estática que se utiliza para generar la respuesta que se envía al cliente que hace uso de la API REST.
 */
class Response
{
	public static function result($code, $response){

		header('Content-type: application/json');
		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
		header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
		http_response_code($code);

		echo json_encode($response);
	}
}

?>