// Obtener el formulario y los campos de fecha de entrada y salida
const formulario = document.getElementById('formularioReserva');
const fechaEntradaInput = document.getElementById('fechaEntrada');
const fechaSalidaInput = document.getElementById('fechaSalida');
const horaEntrada = document.getElementById('horaEntrada');
const horaSalida = document.getElementById('horaSalida');
var botonReserva = document.getElementById('btnreserva');
botonReserva.disabled = true;

// constantes de precios
const PRECIO_DIAS_LABORALES = 8;
const PRECIO_FESTIVOS = 10;

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

// obtener la plaza desde el inicio
var plaza = JSON.parse(localStorage.getItem("plaza"));
var id_plaza = plaza["plaza"];

//estos elementos son para el qr
const imagen=document.createElement("img")
let cuerpoDatos={

                  
    
    Plaza:0,
    FechaReserva:"",
    FechaEntrada:"",
    HoraEntrada:"",
    FechaSalida:"",
    HoraSalida:"",
    importe:0,
    correo:""


}
let datosUsuario=JSON.parse(localStorage.getItem("Datos_usuario"))
console.log(datosUsuario.Correo)
// Agregar eventos de escucha a los campos de fecha de entrada y salida
fechaEntradaInput.addEventListener('input', calcularPrecio);
fechaSalidaInput.addEventListener('input', calcularPrecio);

// Función para calcular el precio
function calcularPrecio() {
    // Obtener las fechas de entrada y salida del formulario
    fechaEntrada = new Date(fechaEntradaInput.value);
    fechaSalida = new Date(fechaSalidaInput.value);

    // Calcular la cantidad de días entre las dos fechas
    const diferenciaTiempo = fechaSalida - fechaEntrada;
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

    if (diferenciaDias <= 0) {
        // Mostrar un mensaje emergente si la fecha de entrada es mayor que la fecha de salida
        alert('La fecha de entrada debe ser menor a la fecha de salida y la reserva será minimo de un dia.');
        resultadoPrecio.textContent = ''; // Limpiar el campo de resultado del precio
        botonReserva.disabled = true;
    } else {
        // Obtener el día de la semana de la fecha de entrada y salida
        const diaEntrada = fechaEntrada.getDay();
        const diaSalida = fechaSalida.getDay();

        // Calcular el precio en función de si es un día laboral o un día festivo        
        for (let i = 0; i < diferenciaDias; i++) {
            const diaActual = (diaEntrada + i) % 7;
            if (diaActual === 0 || diaActual === 6) {
                // Día festivo (sábado o domingo)
                precio += PRECIO_FESTIVOS;
            } else {
                // Día laboral
                precio += PRECIO_DIAS_LABORALES;
            }
        }

        // Mostrar el precio en el campo de resultado del precio
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
    
    var dates = new Date();
    let cuerpo={
        'id_usuario': id_usuario,
        'id_plaza': id_plaza,
        'fecha': dates.toISOString(),
        'hora_entrada': fechaEInsert.toISOString(),
        'hora_salida': fechaSInsert.toISOString(),
        'importe' : precio
    }
    cuerpoDatos={

            
        Plaza:id_plaza,       
        FechaReserva:new Date(),
        FechaEntrada:fechaEntradaInput.value+" a las "+horaEntrada.value,        
        FechaSalida:fechaSalidaInput.value+" a las "+horaSalida.value,
        importe:precio
        


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
            fetch("http://localhost/Proyecto/parking/plazas.php?numero_plaza=" + id_plaza, optionsPUT)
            .then(respuesta=>respuesta.json())
            .then(datos=>{                                        
                if(datos.result==="ok") {       
                    // si tenemos resuesta ok entonces vamos al inicio
                    enviarCorreo(datosUsuario.Correo)    
                    window.location.href = 'misReservas.html';
                      
                }         
            }) 
        }    
    }) 
});

console.log(cuerpoDatos)
const generarQr=()=>{

    const qr=new QRious({
        element: imagen,
        value: `Plaza ${cuerpoDatos.Plaza}
        Fecha de reserva: ${cuerpoDatos.FechaReserva}
        Fecha de entrada: ${cuerpoDatos.FechaEntrada}        
        Fecha de salida: ${cuerpoDatos.FechaSalida}        
        Importe:${cuerpoDatos.importe} euros`


       
        // Fecha de reserva: ${datosReserva.FechaReserva}
        // Fecha de entrada: ${datosReserva.FechaEntrada}
        // Hora de entrada: ${datosReserva.HoraEntrada}
        // Fecha de salida: ${datosReserva.FechaSalida}
        // Hora de salida: ${datosReserva.HoraSalida}
        // Importe:${datosReserva.importe} euros`
          
          
        , // La URL o el texto
        size: 400,
        backgroundAlpha: 0, // 0 para fondo transparente
        foreground: "#8bc34a", // Color del QR
        level: "H" // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
        
      });
    // Obtener la cadena de texto base64 de la imagen PNG
    return qr


}

function enviarCorreo(correo)
{
    let imagenQr = generarQr();    

    //mi token 1f353e26-2417-4109-85ea-1067ce8a71de
        //contraseña 219DBD3DBB0D7FD47A408F23674DDE128588
        Email.send({
            SecureToken : "1f353e26-2417-4109-85ea-1067ce8a71de",
            To : correo,
            From : "parkingrest2023@gmail.com",
            Subject : "Reserva de plaza",
            Body :"Adjunto imagen QR:",
            Attachments: [{
              name: "imagenQR.png",
              data: imagenQr.toDataURL()
            }]
        }).then(
        message => alert(message)
        );

}