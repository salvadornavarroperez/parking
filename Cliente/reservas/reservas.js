import { comprobar} from "../commons.js";

comprobar();

// Obtener el formulario y los campos de fecha de entrada y salida
const formulario = document.getElementById('formularioReserva');
const horaEntrada = document.getElementById('horaEntrada');
const horaSalida = document.getElementById('horaSalida');
var botonReserva = document.getElementById('btnreserva');

let datosUsuario=JSON.parse(localStorage.getItem("Datos_usuario"));

// Obtener el campo de resultado del precio
const resultadoPrecio = document.getElementById('resultadoPrecio');

let precioLaboral = parseInt(localStorage.getItem("t1"));
let precioFestivos = parseInt(localStorage.getItem("t2"));
let tarifas;

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
var fechaEntrada = JSON.parse(localStorage.getItem("fechaE"));
var fechaSalida = JSON.parse(localStorage.getItem("fechaS"));
  
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

  function calcularHoras(fechaEntrada, fechaSalida, precio1, precio2) {
    // Convertir las fechas a objetos Date
    const fecha1 = new Date(fechaEntrada);
    const fecha2 = new Date(fechaSalida);
  
    // Calcular la diferencia en milisegundos entre las fechas
    const diferencia = fecha2 - fecha1;
  
    // Convertir la diferencia a horas
    const horasTotales = Math.ceil(diferencia / (1000 * 60));
  
    // Contador para las horas de fines de semana
    let horasFinesDeSemana = 0;
  
    // Recorrer las horas en el rango y contar las horas de fines de semana
    for (let i = 0; i <= horasTotales; i++) {
      const fecha = new Date(fecha1.getTime() + i * (1000 * 60));
      const diaSemana = fecha.getDay();
  
      if (diaSemana === 0 || diaSemana === 6) {
        horasFinesDeSemana++;
      }
    }
  
    // Restar las horas de fines de semana del total de horas para obtener las horas hábiles
    const horasHabiles = horasTotales - horasFinesDeSemana;
    precio = (horasHabiles * (precio1/1440)) + (horasFinesDeSemana * (precio2/1440));
    resultadoPrecio.textContent = `Precio: ${Math.abs(precio.toFixed(2))} €`;  

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

horaEntrada.addEventListener('change', function(event) {
    if(fechaEntrada === fechaSalida && horaEntrada.value >= horaSalida.value) {
        botonReserva.disabled = true;
        alert("En reservas del mismo dia la entrada no puede ser antes que la salida")
    }
    else if(horaSalida.value) {
        calcularHoras(fechaInsert(fechaEntrada, horaEntrada.value),  fechaInsert(fechaSalida, horaSalida.value), precioLaboral, precioFestivos )
        botonReserva.disabled = false;
    }
});

horaSalida.addEventListener('change', function(event) {
    if(fechaEntrada === fechaSalida  && horaEntrada.value >= horaSalida.value) {
        botonReserva.disabled = true;
        alert("En reservas del mismo dia la salida debe ser despues que la entrada")
    }
    else if(horaEntrada.value) {
        calcularHoras(fechaInsert(fechaEntrada, horaEntrada.value),  fechaInsert(fechaSalida, horaSalida.value), precioLaboral, precioFestivos )
        botonReserva.disabled = false;
    }
});

// Agregar un evento de escucha al envío del formulario
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

        var fechaEInsert = fechaInsert(fechaEntrada, horaEntrada.value);
        var fechaSInsert = fechaInsert(fechaSalida, horaSalida.value)
        
        var dates = new Date();
        let cuerpo={
            'id_usuario': id_usuario,
            'id_plaza': id_plaza,
            'fecha': dates.toISOString(),
            'hora_entrada': fechaEInsert.toISOString(),
            'hora_salida': fechaSInsert.toISOString(),
            'importe' : Math.abs(precio.toFixed(2))
        }

        cuerpoDatos={        
            Plaza:id_plaza,       
            FechaReserva:new Date(),
            FechaEntrada:fechaEntrada + " a las "+horaEntrada.value,        
            FechaSalida:fechaSalida + " a las "+horaSalida.value,
            importe:Math.abs(precio.toFixed(2))
        }
        
        let options={
            method: "POST",
            headers:{'Content-type':'aplication/json'},
            body:JSON.stringify(cuerpo)
        }

        fetch("http://localhost/Proyecto/parking/reservas.php",options)
        .then(respuesta=>respuesta.json())
        .then(datos=>{
        
            if(datos.result==="ok") {          
                if (confirm("Pago realizado con exito")) {
                // si tenemos resuesta ok entonces vamos al inicio
                enviarCorreo(datosUsuario.Correo)    
                window.location.href = 'misReservas.html';                
            }  
                    
            }                                  
        }) 
});

const generarQr=()=>{

    const qr=new QRious({
        element: imagen,
        value: `Plaza ${cuerpoDatos.Plaza}
        Fecha de reserva: ${cuerpoDatos.FechaReserva}
        Fecha de entrada: ${cuerpoDatos.FechaEntrada}        
        Fecha de salida: ${cuerpoDatos.FechaSalida}        
        Importe:${cuerpoDatos.importe} euros`

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
            Body :"Imagen QR con la informacion de su reserva",
            Attachments: [{
              name: "imagenQR.png",
              data: imagenQr.toDataURL()
            }]
        }).then(
        message => alert(message)
        );
}