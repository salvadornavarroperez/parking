import { comprobar } from './commons.js';
comprobar();
let acceso = document.getElementById('user')

var menu = document.getElementById("menu");

//socio
var socioLista = document.createElement("li");
var enlaceSocio = document.createElement("a");
enlaceSocio.textContent = "Hacerse socio";
socioLista.id="esSocio";
enlaceSocio.href="socio/registroSocio.html" 
socioLista.className = "nav-item";
enlaceSocio.className = "nav-link"

// metodo pago
var pagoLista = document.createElement("li");
var enlacePago = document.createElement("a");
enlacePago.textContent = "Añadir metodo de pago";
pagoLista.id="mpago";
enlacePago.href="pago.html" 
pagoLista.className = "nav-item";
enlacePago.className = "nav-link"

socioLista.appendChild(enlaceSocio);
pagoLista.appendChild(enlacePago);

// hacemos aparecer diferente menu si el usuario esta logeado o no
let datos_usuario = JSON.parse(localStorage.getItem('Datos_usuario'));
console.log(datos_usuario)

//acceso.innerHTML = `<p>Bienvenido/a, ${datos_usuario.Nombre}</p> <a href="perfil_usuario.html">Mi perfil</a>`
acceso.innerHTML = `
<div class="d-flex justify-content-end">
  <p class="mr-3">Bienvenido/a, ${datos_usuario.Nombre}
  <a href="#" id="cerrar">Cerrar Sesión</a></p>
</div>`;

// variable usuario de storage
var usuario = JSON.parse(localStorage.getItem("Datos_usuario"));
var id_usuario = usuario["Id_usuario"]; 

fetch("http://localhost/Proyecto/parking/socios.php?Id_usuario=" + id_usuario)
.then(respuesta=>respuesta.json())
.then(datos=>{

// comprobar que recibimos datos de socio o no
    var socios = Array.from(datos.socios);

    // si no es socio añadimos al menu la opcion de hacerse socio, si no, la quitamos si aparece
    if(socios.length == 0) {
        menu.append(socioLista);
    } else if( socios.length > 0 && menu != null) {
        socioLista.removeChild(enlaceSocio);
    }
})

fetch("http://localhost/Proyecto/parking/metodo_pago.php?usuario=" + id_usuario)
.then(respuesta=>respuesta.json())
.then(datos=>{

    // comprobar que recibimos datos de socio o no
    var pago = Array.from(datos.metodo_pago);

    // si no es socio añadimos al menu la opcion de añadir metodo de pago, si no, la quitamos si aparece
    if(pago.length == 0) {
        menu.append(pagoLista);
    } else if( pago.length > 0 && menu != null) {
        pagoLista.removeChild(enlacePago);
    }
})

var cerrarSesion=document.getElementById("cerrar");

cerrarSesion.addEventListener("click",function(){

    localStorage.removeItem("token");
    localStorage.removeItem("Datos_usuario");
    comprobar();
})