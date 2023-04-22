import { testPassword} from "./commons.js";

//recuperamos el id  de nuestro campo
const id=sacarId();

//ahora necesito recuperrar todos los datos del usuario para hacer el update





let nueva = document.getElementById("nueva");
let confirmar = document.getElementById("confirmar");
let formCambiarContrasena = document.getElementById("formCambiarContrasena");
//let datos_usuario = recuperarUsuario(id);
//console.log(datos_usuario.usuarios)


fetch(`http://localhost/Proyecto/parking/usuarios.php?Id_usuario=${}`)
.then(respuesta =>respuesta.json())
.then(datos=>{

   
    formCambiarContrasena.addEventListener("submit", function(event){
        event.preventDefault();
        console.log(nueva.value,confirmar.value)
        console.log(datos_usuario.usuarios)
        if (nueva.value != confirmar.value) {
            alert("Las contraseñas no coinciden");
        }
       
    
        else
        {
            if (testPassword(nueva.value)){
    
                let cuerpo={
                    "Id_usuario":id,
                    "Password":nueva.value,
                    "Nombre": datos.usuarios.Nombre,
                    "Correo": datos.usuarios.Correo,
                    "rol":datos.usuarios.rol
                    
                }
              let options={
                    method: "PUT",
                    headers:{'Content-type':'aplication/json'},
                    body:JSON.stringify(cuerpo)
                        }
                
                fetch("http://localhost/Proyecto/parking/usuarios.php", options)
    
                alert("Las contraseña se ha modificado correctamente");
                window.location = "login.html";
            }else{
                alert("La contraseña debe de tener al menos 8 carácteres, y entre ellos una letra mayuscula y un numero");
                console.log(nueva.value,confirmar.value)
            }
            
        }
        
    });












})







function sacarId()
{
    let url = window.location.href; // obtener la URL completa
    let partes = url.split("/"); // dividir la URL en partes
    let ultimoParte = partes[partes.length - 1]; // obtener el último elemento del array
    let id = ultimoParte.split("=")[1]; // obtener el valor del id
    return id;


}
