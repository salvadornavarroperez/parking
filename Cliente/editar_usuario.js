import { comprobar } from "./comprobacion.js";
comprobar();
let formUpdateUsuario = document.getElementById("formActualizarUsuario");
let nombreUsuario = document.getElementById("nombre");
let correoUsuario = document.getElementById("correo");
let rolUsuario = document.getElementById("rol");
let datos_usuario = JSON.parse(localStorage.getItem("Datos_usuario"));

console.log(datos_usuario)

nombreUsuario.value = datos_usuario.Nombre;
correoUsuario.value = datos_usuario.Correo;
rolUsuario.value = datos_usuario.rol;

formUpdateUsuario.addEventListener("submit", () => {

  let objeto={
        "Id_usuario":datos_usuario.Id_usuario,
        "nombre":nombreUsuario.value,
        "Correo":correoUsuario.value,
        "rol":rolUsuario.value
    }
    actualizarUsuario(objeto)
});

function actualizarUsuario(objeto)
{
    let options={
        method: "PUT",
        headers:{'Content-type':'aplication/json'},
        body:JSON.stringify(objeto)
            }
            fetch("http://localhost/Proyecto/parking/usuarios.php", options)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                console.log(datos)
            });

}