<?php
/**
 * Clase para el modelo que representa a la tabla "player".
 */
require_once 'src/response.php';
require_once 'src/database.php';

class Usuarios extends Database
{
	/**
	 * Atributo que indica la tabla asociada a la clase del modelo
	 */
	private $table = 'usuarios';

	/**
	 * Array con los campos de la tabla que se pueden usar como filtro para recuperar registros
	 */
	private $allowedConditions_get = array(
		'Id_usuario',
        'Nombre',
        'Password',
        'Correo',
		'token',        
        'page'
	);

	/**
	 * Array con los campos de la tabla que se pueden proporcionar para insertar registros
	 */
	private $allowedConditions_insert = array(
		'Nombre',
        'Correo',
		'Password',
		'rol' 
	);
	
	/**
	 * Array con los campos de la tabla que se pueden proporcionar para insertar registros
	 */
	
	 private $allowedConditions_update = array(
		'Id_usuario',
		'Nombre',
        'Correo',
		'rol',
	);
	private $allowedConditions_update_pass = array(
		'Id_usuario',
		'Password'
	);
	
	/**
	 * Método para validar los datos que se mandan para insertar un registro, comprobar campos obligatorios, valores válidos, etc.
	 */
	private function validate($data)
	{

		if (!isset($data['Nombre']) || empty($data['Correo'])||!isset($data['rol']) ) {
			$response = array(
				'result' => 'error',
				'details' => 'El campo player_name es obligatorio'
			);

			Response::result(400, $response);
			exit;
		}

		return true;
	}
	private function validatePass($data)
	{

		if (!isset($data['Password']) || empty($data['Password'])) {
			$response = array(
				'result' => 'error',
				'details' => 'Debes de indicar una constaseña'
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

		$usuarios = parent::getDB($this->table, $params);

		return $usuarios;
	}

	/**
	 * Método para recuperar todos registros
	 */

	 public function getAllUsers() {
		$usuarios = parent::getDB($this->table);
		if(empty($usuarios)) {
			return "No hay usuarios registrados";
		} else {
			return $usuarios;
		}
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
			if (!in_array($key, $this->allowedConditions_update)) {
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
			$affected_rows = parent::updateDB($this->table, $id, $params,"Id_usuario");

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
	public function updatePass($id, $params)
	{
		foreach ($params as $key => $parm) {
			if (!in_array($key, $this->allowedConditions_update_pass)) {
				unset($params[$key]);
				$response = array(
					'result' => 'error',
					'details' => 'Error en la solicitud'
				);

				Response::result(400, $response);
				exit;
			}
		}

		if ($this->validatePass($params)) {
			$affected_rows = parent::updateDB($this->table, $id, $params,"Id_usuario");

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
		$affected_rows = parent::deleteDB($this->table, $id,"Id_usuario");

		if ($affected_rows == 0) {
			$response = array(
				'result' => 'error',
				'details' => 'No hubo cambios'
			);

			Response::result(200, $response);
			exit;
		}
	}

	//funcion que usamos para devolver los datos 















}

?>