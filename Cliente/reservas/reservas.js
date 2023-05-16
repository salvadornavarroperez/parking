// Obtener el formulario y los campos de fecha de entrada y salida
const formulario = document.getElementById('formularioReserva');
const horaEntrada = document.getElementById('horaEntrada');
const horaSalida = document.getElementById('horaSalida');
var botonReserva = document.getElementById('btnreserva');

// constantes de precios
var PRECIO_DIAS_LABORALES = 8;
var PRECIO_FESTIVOS = 10;

fetch("http://localhost/Proyecto/parking/tarifas.php")
.then(respuesta=>respuesta.json())
.then(datos=>{
    if(datos.result==="ok"){
        // comprobar que recibimos datos de tarifa
        var tarifas = Array.from(datos.tarifas);
        PRECIO_DIAS_LABORALES = parseInt(tarifas[0].precio)
        PRECIO_FESTIVOS = parseInt(tarifas[1].precio)
    }
})

// Obtener el campo de resultado del precio
const resultadoPrecio = document.getElementById('resultadoPrecio');

// variable global de precio
var precio = PRECIO_DIAS_LABORALES;

// variable global de plaza
var plazaAleatoria;

// variables globales de fechas y horas de entrada y salida
var fechaEntrada;
var fechaSalida;
//.toISOString().split("T")[0];

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

let datosUsuario=JSON.parse(localStorage.getItem("Datos_usuario"));

function calcularDias(fechaEntrada, fechaSalida) {
    // Convertir las fechas a objetos Date
    const fecha1 = new Date(fechaEntrada);
    const fecha2 = new Date(fechaSalida);
  
    // Calcular la diferencia en milisegundos entre las fechas
    const diferencia = fecha2 - fecha1;
  
    // Convertir la diferencia a días
    const diasTotales = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  
    // Contador para los sábados y domingos
    let finesDeSemana = 0;
  
    // Recorrer los días en el rango y contar los fines de semana
    for (let i = 0; i <= diasTotales; i++) {
      const fecha = new Date(fecha1.getTime() + i * (1000 * 60 * 60 * 24));
      const diaSemana = fecha.getDay();
  
      if (diaSemana === 0 || diaSemana === 6) {
        finesDeSemana++;
      }
    }
  
    // Restar los fines de semana del total de días para obtener los días hábiles
    const diasHabiles = diasTotales - finesDeSemana;
    precio += (diasHabiles*PRECIO_DIAS_LABORALES) + (finesDeSemana*PRECIO_FESTIVOS);
    resultadoPrecio.textContent = `Precio: ${precio} €`;
  }

calcularDias(fechaEntrada, fechaSalida)

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

    var fechaEInsert = fechaInsert(fechaEntrada, horaEntrada.value);
    var fechaSInsert = fechaInsert(fechaSalida, horaSalida.value)
    
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
        FechaEntrada:fechaEntrada + " a las "+horaEntrada.value,        
        FechaSalida:fechaSalida + " a las "+horaSalida.value,
        importe:precio
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
            // si tenemos resuesta ok entonces vamos al inicio
            enviarCorreo(datosUsuario.Correo)    
            window.location.href = 'misReservas.html';                      
        }                                  
    }) 
});

console.log(cuerpoDatos)
const generarQr=()=>{
    console.log(cuerpoDatos)

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
            Body :"Adjunto imagen QR:",
            Attachments: [{
              name: "imagenQR.png",
              data: imagenQr.toDataURL()
            }]
        }).then(
        message => alert(message)
        );
}