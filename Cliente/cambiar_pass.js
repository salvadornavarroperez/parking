import { comprobar, testPassword} from "./commons.js";

//recuperamos el id  de nuestro campo
let id=sacarId();

//tenemos que recuperar todos los datos del usuario para

comprobar();
let nueva = document.getElementById("nueva");
let confirmar = document.getElementById("confirmar");
let formCambiarContrasena = document.getElementById("formCambiarContrasena");
let datos_usuario = JSON.parse(localStorage.getItem("Datos_usuario"));

formCambiarContrasena.addEventListener("submit", function(event){
    event.preventDefault();
    if (nueva.value != confirmar.value) {
        alert("Las contraseñas no coinciden");
    }
   
    else
    {
        if (testPassword(nueva)){

            let cuerpo={
                "Id_usuario":id,
                "Password":nueva.value
                
            }
          let options={
                method: "PATCH",
                headers:{'Content-type':'aplication/json'},
                body:JSON.stringify(cuerpo)
                    }
            
            fetch("http://localhost/Proyecto/parking/usuarios.php", options)

            alert("Las contraseña se ha modificado correctamente");
            window.location = "login.html";
        }else{
            alert("La contraseña debe de tener al menos 8 carácteres, y entre ellos una letra mayuscula y un numero");
        }
        
    }
    
});


function sacarId()
{
    let url = window.location.href; // obtener la URL completa
    let partes = url.split("/"); // dividir la URL en partes
    let ultimoParte = partes[partes.length - 1]; // obtener el último elemento del array
    let id = ultimoParte.split("=")[1]; // obtener el valor del id
    return id;


}