<?php
/**
 * Clase para el modelo que representa a la tabla "reservas".
 */
require_once 'src/response.php';
require_once 'src/database.php';

class Reservas extends Database
{
	/**
	 * Atributo que indica la tabla asociada a la clase del modelo
	 */
	private $table = 'reservas';

	/**
	 * Array con los campos de la tabla que se pueden usar como filtro para recuperar registros
	 */
	private $allowedConditions_get = array(
	
        'Id_reserva',
        'id_usuario',
        'id_plaza',
        'fecha',
        'hora_entrada',
        'hora_salida',
        'importe',
		'page'
	);

	/**
	 * Array con los campos de la tabla que se pueden proporcionar para insertar registros
	 */
	private $allowedConditions_insert = array(
		'id_usuario',
        'id_plaza',
        'fecha',
        'hora_entrada',
        'hora_salida',
        'importe'
	);

	/**
	 * Método para validar los datos que se mandan para insertar un registro, comprobar campos obligatorios, valores válidos, etc.
	 */
	private function validate($data)
	{

		if (!isset($data['id_usuario']) || empty($data['id_plaza'])|| empty($data['fecha']) || empty($data['hora_entrada'])|| empty($data['hora_salida']) || empty($data['importe'])) {
			$response = array(
				'result' => 'error',
				'details' => 'El campo tal es obligatorio'
			);

			Response::result(400, $response);
			exit;
		}

		return true;
	}

	/**
	 * Método para recuperar registros, pudiendo indicar algunos filtros 
	 */
	public function get($params)
	{
		foreach ($params as $key => $param) {
			if (!in_array($key, $this->allowedConditions_get)) {
				unset($params[$key]);
				$response = array(
					'result' => 'error',
					'details' => 'Error en la solicitud'
				);

				Response::result(400, $response);
				exit;
			}
		}

		$reservas = parent::getDB($this->table, $params);

		return $reservas;
	}

	/**
	 * Método para guardar un registro en la base de datos, recibe como parámetro el JSON con los datos a insertar
	 */
	public function insert($params)
	{
		foreach ($params as $key => $param) {
			if (!in_array($key, $this->allowedConditions_insert)) {
				unset($params[$key]);
				$response = array(
					'result' => 'error',
					'details' => 'Error en la solicitud'
				);

				Response::result(400, $response);
				exit;
			}
		}

		if ($this->validate($params)) {
			return parent::insertDB($this->table, $params);
		}
	}

	/**
	 * Método para actualizar un registro en la base de datos, se indica el id del registro que se quiere actualizar
	 */
	public function update($id, $params)
	{
		foreach ($params as $key => $parm) {
			if (!in_array($key, $this->allowedConditions_insert)) {
				unset($params[$key]);
				$response = array(
					'result' => 'error',
					'details' => 'Error en la solicitud'
				);

				Response::result(400, $response);
				exit;
			}
		}

		if ($this->validate($params)) {
			$affected_rows = parent::updateDB($this->table, $id, $params,"Id_reserva");

			if ($affected_rows == 0) {
				$response = array(
					'result' => 'error',
					'details' => 'No hubo cambios'
				);

				Response::result(200, $response);
				exit;
			}
		}
	}

	/**
	 * Método para borrar un registro de la base de datos, se indica el id del registro que queremos eliminar
	 */
	public function delete($id)
	{
		$affected_rows = parent::deleteDB($this->table, $id,"Id_reserva");

		if ($affected_rows == 0) {
			$response = array(
				'result' => 'error',
				'details' => 'No hubo cambios'
			);

			Response::result(200, $response);
			exit;
		}
	}

	public function getReservas($fecha1, $fecha2)
	{
		$reservas = parent::getReservasDB($fecha1, $fecha2);		
		return $reservas;

	}
}

?>