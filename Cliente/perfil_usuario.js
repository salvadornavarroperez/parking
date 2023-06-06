import { comprobar } from './commons.js';
comprobar();
document.body.style.backgroundImage = "url('imagenes/textura-acero.png')";
document.body.style.backgroundSize = "cover";
var infoUsuario = document.getElementById('infoUsuario')

var datos_usuario = JSON.parse(localStorage.getItem('Datos_usuario'));
var id_usuario = datos_usuario["Id_usuario"]; 
var socios = null;
var sociosNum;

fetch("http://localhost/Proyecto/parking/socios.php?Id_usuario=" + id_usuario)
.then(respuesta=>respuesta.json())
.then(datos=>{
    // comprobar que recibimos datos de socio o no
    socios = Array.from(datos.socios);
    if (socios.length > 0) {
        sociosNum = 1;
    } else sociosNum = 0;
    
    fetch("http://localhost/Proyecto/parking/metodo_pago.php?usuario=" + id_usuario)
    .then(respuesta=>respuesta.json())
    .then(datos=>{    
    
        // comprobar que recibimos datos de socio o no
        var pago = Array.from(datos.metodo_pago);
    
        // si no es socio añadimos al menu la opcion de añadir metodo de pago, si no, la quitamos si aparece
        if(pago.length == 0) {
            infoUsuario.innerHTML = `<p>
            Nombre: <b>${datos_usuario.Nombre}</b><br>
            Correo: <b>${datos_usuario.Correo}</b><br>
            Socio: <b>${sociosNum == 0 ? "No" : "Si"}</b><br>                      
            </p>`
    
        } else {
    
            infoUsuario.innerHTML = `<p>
            Nombre: <b>${datos_usuario.Nombre}</b><br>
            Correo: <b>${datos_usuario.Correo}</b><br>
            Socio: <b>${sociosNum == 0 ? "No" : "Si"}</b><br>
            Metodo de pago: <b>Tarjeta que termina en ${datos.metodo_pago[0].numero_tarjeta.slice(-4)}</b><br>
            </p>`
        }
    })
    
})



