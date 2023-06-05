import { comprobar, testPassword} from "./commons.js";
document.body.style.backgroundImage = "url('imagenes/textura-acero.png')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
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
        if (testPassword(nueva.value)){

            let cuerpo={
                "Id_usuario":datos_usuario.Id_usuario,
                "Password":nueva.value
                
            }
          let options={
                method: "PUT",
                headers:{'Content-type':'aplication/json'},
                body:JSON.stringify(cuerpo)
                    }
            
            fetch("http://localhost/Proyecto/parking/usuarios.php", options)

            alert("Las contraseña se ha modificado correctamente");
            window.location = "perfil_usuario.html";
        }else{
            alert("La contraseña debe de tener al menos 8 carácteres, y entre ellos una letra mayuscula y un numero");
        }
        
    }
    
});