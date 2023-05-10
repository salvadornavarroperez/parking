import { comprobar } from './commons.js';
comprobar();
let acceso = document.getElementById('user')

var menu = document.getElementById("menu");
var socioLista = document.createElement("li");
var enlaceSocio = document.createElement("a");
enlaceSocio.textContent = "Hacerse socio";
socioLista.id="esSocio";
enlaceSocio.href="socio/registroSocio.html" 
socioLista.className = "nav-item";
enlaceSocio.className = "nav-link"

socioLista.appendChild(enlaceSocio);

// hacemos aparecer diferente menu si el usuario esta logeado o no
let datos_usuario = JSON.parse(localStorage.getItem('Datos_usuario'));
console.log(datos_usuario)

//acceso.innerHTML = `<p>Bienvenido/a, ${datos_usuario.Nombre}</p> <a href="perfil_usuario.html">Mi perfil</a>`
acceso.innerHTML = `
<div class="d-flex justify-content-end">
  <p class="mr-3">Bienvenido/a, ${datos_usuario.Nombre}
  <a href="#" id="cerrar">Cerrar Sesión</a></p>
</div>`;

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
var cerrarSesion=document.getElementById("cerrar");

cerrarSesion.addEventListener("click",function(){

    localStorage.removeItem("token");
    localStorage.removeItem("Datos_usuario");
    comprobar();
})
fetch("http://localhost/Proyecto/parking/usuarios.php?Id_usuario=" + id_usuario)
.then(respuesta=>respuesta.json())
.then(datos=>{
    if (datos.usuarios[0].rol == '3') {// Creamos el elemento del menú desplegable "Panel Admin"
        // Creamos el elemento del menú desplegable "Panel Admin"
        var adminLista = document.createElement("li");
        adminLista.className = "nav-item dropdown";

        // Creamos el enlace del menú desplegable "Panel Admin"
        var enlaceAdmin = document.createElement("a");
        enlaceAdmin.className = "nav-link dropdown-toggle";
        enlaceAdmin.href = "#";
        enlaceAdmin.textContent = "Panel Admin";
        enlaceAdmin.setAttribute("id", "navbarDropdown");
        enlaceAdmin.setAttribute("role", "button");
        enlaceAdmin.setAttribute("data-toggle", "dropdown");
        enlaceAdmin.setAttribute("aria-haspopup", "true");
        enlaceAdmin.setAttribute("aria-expanded", "false");

        // Creamos la lista de submenús del menú desplegable "Panel Admin"
        var subMenuAdmin = document.createElement("div");
        subMenuAdmin.className = "dropdown-menu";
        subMenuAdmin.setAttribute("aria-labelledby", "navbarDropdown");

        // Creamos los enlaces de los submenús del menú desplegable "Panel Admin"
        var enlaceUsuarios = document.createElement("a");
        enlaceUsuarios.className = "dropdown-item";
        enlaceUsuarios.href = "#";
        enlaceUsuarios.textContent = "Usuarios";

        var enlaceReservas = document.createElement("a");
        enlaceReservas.className = "dropdown-item";
        enlaceReservas.href = "#";
        enlaceReservas.textContent = "Reservas";

        var enlaceTarifas = document.createElement("a");
        enlaceTarifas.className = "dropdown-item";
        enlaceTarifas.href = "#";
        enlaceTarifas.textContent = "Tarifas";

        var enlaceNotificaciones = document.createElement("a");
        enlaceNotificaciones.className = "dropdown-item";
        enlaceNotificaciones.href = "#";
        enlaceNotificaciones.textContent = "Notificaciones";

        var enlaceCotizacion = document.createElement("a");
        enlaceCotizacion.className = "dropdown-item";
        enlaceCotizacion.href = "#";
        enlaceCotizacion.textContent = "Visor de cotizacion";

        // Añadimos los enlaces de submenús al menú desplegable
        subMenuAdmin.appendChild(enlaceUsuarios);
        subMenuAdmin.appendChild(enlaceReservas);
        subMenuAdmin.appendChild(enlaceTarifas);
        subMenuAdmin.appendChild(enlaceNotificaciones);
        subMenuAdmin.appendChild(enlaceCotizacion);

        // Añadimos el enlace del menú desplegable y la lista de submenús al menú principal
        adminLista.appendChild(enlaceAdmin);
        adminLista.appendChild(subMenuAdmin);
        menu.appendChild(adminLista)
    }
})
