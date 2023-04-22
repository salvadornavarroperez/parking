// Obtener el formulario y los campos de fecha de entrada y salida
const formulario = document.getElementById('formularioReserva');
const fechaEntradaInput = document.getElementById('fechaEntrada');
const fechaSalidaInput = document.getElementById('fechaSalida');
const horaEntrada = document.getElementById('horaEntrada');
const horaSalida = document.getElementById('horaSalida');
var botonReserva = document.getElementById('btnreserva');
botonReserva.disabled = true;

// Obtener el campo de resultado del precio
const resultadoPrecio = document.getElementById('resultadoPrecio');

// variable global de precio
var precio = 0;

// variable global de plaza
var plazaAleatoria;

// variables globales de fechas y horas de entrada y salida
var fechaEntrada;
var fechaSalida;

// Obtener el usuario actual
var usuario = JSON.parse(localStorage.getItem("Datos_usuario"));
var id_usuario = usuario["Id_usuario"]; 

// Agregar eventos de escucha a los campos de fecha de entrada y salida
fechaEntradaInput.addEventListener('input', calcularPrecio);
fechaSalidaInput.addEventListener('input', calcularPrecio);

// saber las plazas libres y obtener una libre aleatoriamente
// obtener plazas libres del parking
fetch("http://localhost/Proyecto/parking/plazas.php?disponible=1")
.then(respuesta=>respuesta.json())
.then(datos=>{

    // comprobamos que hay plazas libres
    var plazas = Array.from(datos.plazas);

    if(plazas.length == 0) {
       console.log("Pues te has quedao sin plaza amigo")
    } else {
                
        let randomIndex = Math.floor(Math.random() * plazas.length);
        let randomNum = plazas[randomIndex];
        plazaAleatoria = randomNum['Id_plaza'] 
    }  
}) 

// Función para calcular el precio
function calcularPrecio() {
    // Obtener las fechas de entrada y salida del formulario
    fechaEntrada = new Date(fechaEntradaInput.value);
    fechaSalida = new Date(fechaSalidaInput.value);

    // Calcular la cantidad de días entre las dos fechas
    const diferenciaTiempo = fechaSalida - fechaEntrada;
    const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

    if (diferenciaDias <= 0) {
        // Mostrar un mensaje emergente si la fecha de entrada es mayor que la fecha de salida
        alert('La fecha de entrada debe ser menor a la fecha de salida y la reserva será minimo de un dia.');
        resultadoPrecio.textContent = ''; // Limpiar el campo de resultado del precio
        botonReserva.disabled = true;
    } else if (diferenciaDias >= 1) {
        // Calcular el precio en función de la cantidad de días y mostrarlo en el campo de resultado del precio
        precio = diferenciaDias * 8;
        resultadoPrecio.textContent = `Precio: ${precio} €`;
        botonReserva.disabled = false;
    }
}

function fechaInsert (fecha, hora) {

    // Dividir la fecha en componentes (año, mes, día)
    var partesFecha = fecha.split('-');
    var año = parseInt(partesFecha[0]);
    var mes = parseInt(partesFecha[1]) - 1; // Los meses en JavaScript son 0-indexados, por lo que se resta 1
    var dia = parseInt(partesFecha[2]);

    // Dividir la hora en componentes (hora, minuto)
    var partesHora = hora.split(':');
    var hora = parseInt(partesHora[0]);
    var minuto = parseInt(partesHora[1]);

    // Crear un objeto Date con la fecha y la hora
    return new Date(año, mes, dia, hora+2, minuto);
}

// Agregar un evento de escucha al envío del formulario
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    var fechaEInsert = fechaInsert(fechaEntradaInput.value, horaEntrada.value);
    var fechaSInsert = fechaInsert(fechaSalidaInput.value, horaSalida.value)
    
    let cuerpo={
        'id_usuario': id_usuario,               
        'id_plaza': plazaAleatoria,
        'fecha': new Date(),
        'hora_entrada': fechaEInsert,
        'hora_salida': fechaSInsert,
        'importe' : precio
    }
    
    let options={
        method: "POST",
        headers:{'Content-type':'aplication/json'},
        body:JSON.stringify(cuerpo)
    }

    let cuerpoPUT={
        'disponible': 0
    }
    
    let optionsPUT={
        method: "PUT",
        headers:{'Content-type':'aplication/json'},
        body:JSON.stringify(cuerpoPUT)
    }

    fetch("http://localhost/Proyecto/parking/reservas.php",options)
    .then(respuesta=>respuesta.json())
    .then(datos=>{
    
        if(datos.result==="ok") {       
            // si tenemos resuesta ok entonces ponemos la plaza a no disponible
            fetch("http://localhost/Proyecto/parking/plazas.php?numero_plaza=" + plazaAleatoria, optionsPUT)
            .then(respuesta=>respuesta.json())
            .then(datos=>{                                        
                if(datos.result==="ok") {       
                    // si tenemos resuesta ok entonces vamos al inicio
                     window.location.href = 'misReservas.html';    
                }         
            }) 
        }    
    }) 
});