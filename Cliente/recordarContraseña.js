import { comprobar} from "./commons.js";
comprobar()
let correo=document.querySelector("#correo");
let boton=document.querySelector("#enviar");
let error=document.querySelector("#error");
let formulario=document.querySelector("#formulario");
//montamos el enlace en caso de que se pueda usar
let enlace ="http://localhost/Proyecto/parking/Cliente/cambiar_pass.html?id=";


const regexEmail = /\S+@\S+\.\S+/;

formulario.addEventListener("submit",(event)=>{

    event.preventDefault();
    if(regexEmail.test(correo.value))
        {   
            //comprobamos si ese correo existe en la base de datos
            fetch("http://localhost/Proyecto/parking/usuarios.php?Correo="+correo.value)
            .then(respuesta => respuesta.json())
            .then(datos=>{

                if(datos.result=="ok"&&datos.usuarios)
                {
                    enlace=enlace+`${datos.usuarios[0].Id_usuario}`;
                    enviarCorreo(correo.value)
                    error.textContent="Correo enviado con exito, puede ser que deba ver la bandeja de correo basura"
                   
                }
                else
                {
                    
                    error.textContent="El correo no está registrado en la base de datos"
                }
            })
        }
        else
        {
            error.textContent="El email introducido no es válido";
        }



})



//primero comprobamos que el usuario existe
// boton.addEventListener("click",function(){


        
// })


function enviarCorreo(correo)
{
        //mi token 1f353e26-2417-4109-85ea-1067ce8a71de
        //contraseña 219DBD3DBB0D7FD47A408F23674DDE128588
        Email.send({
            SecureToken : "1f353e26-2417-4109-85ea-1067ce8a71de",
            To : correo,
            From : "parkingrest2023@gmail.com",
            Subject : "Cambio de password",
            Body : `Pinche en el siguiente enlace para cambiar su contraseña: <a href="${enlace}">${enlace}</a>`
        }).then(
        message => alert(message)
        );

}