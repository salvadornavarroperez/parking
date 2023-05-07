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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" integrity="sha512-a0dYmX4uhqzDqjZ8fysMgXmW9Jb8/Fp3tMdXnN1KuSj9sB4N3ukrVjJ3mZ6LZdXAJh9fJWsIImTJ0JfTlJ5v3g==" crossorigin="anonymous" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>


    
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
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmIv99jTJiaGjIXwBh/n" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js" integrity="sha512-tgWvqFwPbY/MK/DzE/5J+Rin5/SxnXjF7GCqxgzJYLeZM6ZK2x62TjKU8mgvstQwFQ/9GZ8ro5tfaJ/EVZ6H+Q==" crossorigin="anonymous"></script>

</body>
</html>
