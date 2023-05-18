import { comprobar } from './commons.js';
comprobar();
let acceso = document.getElementById('user')

var menu = document.getElementById("menu");

var t1 = document.getElementById("tarifa1");
var t2 = document.getElementById("tarifa2");


//socio
var socioLista = document.createElement("li");
var enlaceSocio = document.createElement("a");
enlaceSocio.textContent = "Hacerse socio";
socioLista.id="esSocio";
enlaceSocio.href="socio/registroSocio.html" 
socioLista.className = "nav-item";
enlaceSocio.className = "nav-link"

//socio
var sociobLista = document.createElement("li");
var enlacebSocio = document.createElement("a");
enlacebSocio.textContent = "Darse de baja como socio";
sociobLista.id="esSocio";
enlacebSocio.href="socio/bajaSocio.html" 
sociobLista.className = "nav-item";
enlacebSocio.className = "nav-link"

// metodo pago
var pagoLista = document.createElement("li");
var enlacePago = document.createElement("a");
enlacePago.textContent = "Añadir metodo de pago";
pagoLista.id="mpago";
enlacePago.href="pago.html" 
pagoLista.className = "nav-item";
enlacePago.className = "nav-link"

sociobLista.appendChild(enlacebSocio);
socioLista.appendChild(enlaceSocio);
pagoLista.appendChild(enlacePago);

// hacemos aparecer diferente menu si el usuario esta logeado o no
let datos_usuario = JSON.parse(localStorage.getItem('Datos_usuario'));

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
        sociobLista.removeChild(enlacebSocio);
    } else if( socios.length > 0 && menu != null) {
        socioLista.removeChild(enlaceSocio);
        menu.append(sociobLista);
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

fetch("http://localhost/Proyecto/parking/tarifas.php")
.then(respuesta=>respuesta.json())
.then(datos=>{
    if(datos.result==="ok"){
        // comprobar que recibimos datos de tarifa
        var tarifas = Array.from(datos.tarifas);
        t1.textContent = tarifas[0].precio + "€"
        t2.textContent = tarifas[1].precio + "€"

        localStorage.setItem("t1",tarifas[0].precio);
        localStorage.setItem("t2",tarifas[1].precio);
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
        enlaceUsuarios.href = "./admin/listaUsuarios.html";
        enlaceUsuarios.textContent = "Usuarios";

        var enlaceReservas = document.createElement("a");
        enlaceReservas.className = "dropdown-item";
        enlaceReservas.href = "./admin/listaReservas.html";
        enlaceReservas.textContent = "Reservas";

        var enlaceTarifas = document.createElement("a");
        enlaceTarifas.className = "dropdown-item";
        enlaceTarifas.href = "./admin/tarifas.html";
        enlaceTarifas.textContent = "Tarifas";

        var enlaceSimulador = document.createElement("a");
        enlaceSimulador.className = "dropdown-item";
        enlaceSimulador.href = "./simulador/simulador.html";
        enlaceSimulador.textContent = "Simulador";

        // Añadimos los enlaces de submenús al menú desplegable
        subMenuAdmin.appendChild(enlaceUsuarios);
        subMenuAdmin.appendChild(enlaceReservas);
        subMenuAdmin.appendChild(enlaceTarifas);
        subMenuAdmin.appendChild(enlaceSimulador);

        // Añadimos el enlace del menú desplegable y la lista de submenús al menú principal
        adminLista.appendChild(enlaceAdmin);
        adminLista.appendChild(subMenuAdmin);
        menu.appendChild(adminLista)
    }
})

  
