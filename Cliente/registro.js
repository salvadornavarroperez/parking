document.body.style.backgroundImage = "url('imagenes/vehiculos-estacionados.png')";
document.body.style.backgroundRepeat = "no-repeat";
//elementos del formulario1
const formulario=document.querySelector("#formulario1");
let nombre=document.querySelector("#nombre");
let nombErr=document.querySelector("#nombErr");
let password=document.querySelector("#password");
let passErr=document.querySelector("#passErr");
let email=document.querySelector("#email");
let botonReset=document.querySelector("#reset");
//recogemos el select que nos sirve para pasar a la siguiente pagina
let metodoPago=document.querySelector("#metodoPago");
var login=document.getElementById("login");

//lo deshabilitamos de primeras hasta que el registro de usuario se complete
//metodoPago.disabled=true;

formulario.addEventListener("submit",(event)=>{

    //evitamos el envio de datos
    event.preventDefault();  
    

    //creamos las expresiones regulares que comprueben que se cumple con los valores requeridos
    const regexEmail = /\S+@\S+\.\S+/;
    const regexNombre = /^[^\d\s]+(\s+[^\d\s]+)*$/;
    const regexPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    let existeCorreo=false;


    if(!regexNombre.test(nombre.value))
    {
        //comprobamos
        nombErr.textContent="El nombre debe tener al menos 1 caracter";

    }
    if(!regexPassword.test(password.value))
    {
        passErr.textContent="El password debe tener al menos 1 letra mayúscula, 1 número y al menos 8 caracteres";
    }
    if(!regexEmail.test(email.value))
    {
        emailErr.textContent="El correo no es valido";
    }
    if(regexEmail.test(email.value))
    {
        //comprobamos si el correo está ya resgistrado
        fetch("http://localhost/Proyecto/parking/usuarios.php")
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            let coincidencias=datos.usuarios.filter(usuario=>usuario.Correo==email.value)
            if(coincidencias.length>0)
            {
                emailErr.textContent="El correo ya existe";
                existeCorreo=true;
            }
                
           
        })
        

    }
    if(regexNombre.test(nombre.value)&&regexPassword.test(password.value)&&regexEmail.test(email.value))
    {
        
                    

          //formamos el objeto que vamos a enviar por post para que la api rest haga un post
            const objeto={
                'Nombre':nombre.value,
                'Password':password.value,
                'Correo':email.value,
                'rol':1
            };
            if(!existeCorreo)
            {
                registraUsuario(objeto); 
            }            
           
    }
})


function registraUsuario(objeto)
{
    let options={
        method: "POST",
        headers:{'Content-type':'aplication/json'},
        body:JSON.stringify(objeto)
            }
    

        fetch("http://localhost/Proyecto/parking/altaUsuario.php",options)
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            if(datos.result==="ok") {
                window.location.href = 'login.html';
            }
        })  

}


login.addEventListener("click",function(){
    window.location.href = 'login.html';
})