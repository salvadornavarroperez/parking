import { comprobar } from './commons.js';
comprobar();
let acceso = document.getElementById('user')

var menu = document.getElementById("menu");
var socioLista = document.createElement("li");
var enlaceSocio = document.createElement("a");
let cerrarSesion=document.querySelector("#cerrar");
enlaceSocio.textContent = "Hacerse socio";
socioLista.id="esSocio";
enlaceSocio.href="registroSocio.html" 
socioLista.appendChild(enlaceSocio);

// hacemos aparecer diferente menu si el usuario esta logeado o no
let datos_usuario = JSON.parse(localStorage.getItem('Datos_usuario'));
console.log(datos_usuario)

acceso.innerHTML = `<p>Bienvenido/a, ${datos_usuario.Nombre}</p> <a href="perfil_usuario.html">Mis perfil</a> <a href="cerrar_sesion.html">Cerrar sesión</a>`

console.log(acceso)

// variable usuario de storage, esto es la polla
var usuario = JSON.parse(localStorage.getItem("Datos_usuario"));
var id_usuario = usuario["Id_usuario"]; 

// ver si el menu esta con la pregunta de hacerse socio
var hacerseSocio = document.getElementById("menu");

fetch("http://localhost/Proyecto/parking/socios.php?Id_usuario=" + id_usuario)
.then(respuesta=>respuesta.json())
.then(datos=>{

// comprobar que recibimos datos de socio o no
    var socios = Array.from(datos.socios);

    // si no es socio añadimos al menu la opcion de hacerse socio, si no, la quitamos si aparece
    if(socios.length == 0) {
        menu.append(socioLista);
    } else if( socios.length > 0 && hacerseSocio != null) {
        socioLista.removeChild(enlaceSocio);
    }
})

cerrarSesion.addEventListener("click",function(){

    localStorage.removeItem("token");
    localStorage.removeItem("Datos_usuario");
    comprobar();
})