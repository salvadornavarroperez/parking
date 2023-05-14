<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>This.park</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Enlace al archivo de estilos de Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

    
</head>
<body>
    <div id="user"></div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menuCollapse" aria-controls="menuCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menuCollapse">
            <ul class="navbar-nav mr-auto" id="menu">
                <li class="nav-item"><a class="nav-link" href="inicio.php">Inicio</a></li>                       
                <li class="nav-item"><a class="nav-link" href="vehiculos/registrarVehiculo.html">Registro Vehiculo</a></li>
                <li class="nav-item"><a class="nav-link" href="vehiculos/misVehiculos.html">Mis vehiculos</a></li>
                <li class="nav-item"><a class="nav-link" href="perfil_usuario.html">Mi perfil</a></li>            
                <li class="nav-item"><a class="nav-link" href="reservas/misReservas.html">Mis Reservas</a></li>
            </ul>
        </div>
    </nav>
    <!-- Contenido de la página -->
    <div class="container">
        <div class="row">
            <div class="col-md-8 mx-auto text-center">
            <h6 class="mb-0">Precio días laborales: <span class="precio precio-dias-laborales" id="tarifa1"></span></h6>
            <h6 class="mb-0">Precio fin de semana y festivos: <span class="precio precio-festivos" id="tarifa2"></span></h6>
            </div>
        </div>
    </div>

    <?php include 'Plazas/plano_reserva.php'; ?>
    <main class="container mt-4">
       
    </main>
    <!-- Enlace al archivo de JavaScript con atributo defer para carga asíncrona -->
    <script type="module" defer src="inicio.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
