import { comprobar, testPassword} from "./commons.js";

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
            nueva.value=''
            confirmar.value=''
        }else{
            alert("Las contraseñas no cumplen");
        }
        
    }
    
});