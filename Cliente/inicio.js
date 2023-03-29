import { comprobar } from './comprobacion.js';

comprobar();

var menu = document.getElementById("menu");
var socioLista = document.createElement("li");
var enlaceSocio = document.createElement("a");
enlaceSocio.textContent = "Hacerse socio";
socioLista.id="esSocio";
// formulario aun por hacer
enlaceSocio.href="index-socio.html" 
socioLista.appendChild(enlaceSocio);

// variable usuario aun por definir por variable de storage, arreglo temporal
var user = 2;

// ver si el menu esta con la pregunta de hacerse socio
var hacerseSocio = document.getElementById("menu");

fetch("http://localhost/Proyecto/parking/socios.php?Id_usuario=" + user)
.then(respuesta=>respuesta.json())
.then(datos=>{

// comprobar que recibimos datos de socio o no
    var socios = Array.from(datos.socios);
    console.log(socios.length)

    // si no es socio añadimos al menu la opcion de hacerse socio, si no, la quitamos si aparece
    if(socios.length == 0) {
        menu.append(socioLista);
    } else if( socios.length > 0 && hacerseSocio != null) {
        socioLista.removeChild(enlaceSocio);
    }
}) 
