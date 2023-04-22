<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>This.park</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Enlace al archivo de estilos de Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    
</head>
<body>
    <div id="user"></div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-nav mr-auto" id = "menu">
            <li class="nav-item"><a class="nav-link" href="inicio.php">Inicio</a></li>                       
            <li class="nav-item"><a class="nav-link" href="vehiculos/registrarVehiculo.html">Registro Vehiculo</a></li>
            <li class="nav-item"><a class="nav-link" href="vehiculos/misVehiculos.html">Mis vehiculos</a></li>
            <li class="nav-item"><a class="nav-link" href="pago.html">Añadir metodo de pago</a></li>
            <li class="nav-item"><a class="nav-link" href="perfil_usuario.html">Mi perfil</a></li>            
            <li class="nav-item"><a class="nav-link" href="reservas/misReservas.html">Mis Reservas</a></li>
        </ul>
    </nav>
    <!-- Contenido de la página -->
    <?php include 'Plazas/plano_reserva.php'; ?>
    <main class="container mt-4">
       
    </main>
    <!-- Enlace al archivo de JavaScript con atributo defer para carga asíncrona -->
    <script type="module" defer src="inicio.js"></script>
</body>
</html>
