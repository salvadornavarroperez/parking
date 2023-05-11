<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Lista de Usuarios</title>
	</head>
	<body>
		<h1>Lista de Usuarios</h1>
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Nombre</th>
					<th>Correo electrónico</th>
					<th>Contraseña</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<?php
					//Se realiza la petición GET al endpoint
					$curl = curl_init();
					curl_setopt_array($curl, array(
						CURLOPT_RETURNTRANSFER => 1,
						CURLOPT_URL => 'http://localhost/Proyecto/parking/usuarios.php',
						CURLOPT_HTTPGET => 1
					));
					$response = json_decode(curl_exec($curl));
					curl_close($curl);

					//Se muestran los usuarios y sus atributos en campos editables
					foreach($response->usuarios as $usuario){
						echo '<tr>';
						echo '<td>'.$usuario->Id_usuario.'</td>';
						echo '<td><input type="text" name="Nombre" value="'.$usuario->Nombre.'"></td>';
						echo '<td><input type="text" name="Correo" value="'.$usuario->Correo.'"></td>';
						echo '<td><input type="password" name="Password" value=""></td>';
						echo '<td><a href="http://localhost/Proyecto/parking/usuarios.php?Id_usuario='.$usuario->Id_usuario.'&Nombre='.$usuario->Nombre.'&Correo='.$usuario->Correo.'&Password='.$usuario->Password.'&_method=PUT">Actualizar</a></td>';
						echo '</tr>';
					}
				?>
			</tbody>
		</table>
	</body>
</html>
