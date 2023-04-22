//elementos del formulario1
const formulario=document.querySelector("#formulario1");
let respuesta=document.querySelector("#respuesta");
let nombre=document.querySelector("#nombre");
let nombErr=document.querySelector("#nombErr");
let password=document.querySelector("#password");
let passErr=document.querySelector("#passErr");
let email=document.querySelector("#email");
let mostrarPass=document.querySelector("#oculto");
let botonReset=document.querySelector("#reset");
//recogemos el select que nos sirve para pasar a la siguiente pagina
let metodoPago=document.querySelector("#metodoPago");
let login=document.querySelector("#login");

//lo deshabilitamos de primeras hasta que el registro de usuario se complete
metodoPago.disabled=true;


formulario.addEventListener("submit",(event)=>{

    //evitamos el envio de datos
    event.preventDefault();  
    

    //creamos las expresiones regulares que comprueben que se cumple con los valores requeridos
    const regexEmail = /\S+@\S+\.\S+/;
    const regexNombre = /^[^\d\s]+(\s+[^\d\s]+)*$/;
    const regexPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;


    if(!regexNombre.test(nombre.value))
    {
        //comprobamos
        nombErr.textContent="El nombre debe tener al menos 1 caracter";

    }
    if(!regexPassword.test(password.value))
    {
        console.log(password.value)
        passErr.textContent="El password debe tener al menos 1 letra mayúscula, 1 número y al menos 8 caracteres";
    }
    if(!regexEmail.test(email.value))
    {
        emailErr.textContent="El correo no es valido";
    }
    if(regexNombre.test(nombre.value)&&regexPassword.test(password.value)&&regexEmail.test(email.value))
    {
        
          //si ha seleccionado un métodod de pago
            

          //formamos el objeto que vamos a enviar por post para que la api rest haga un post
            const objeto={
                'nombre':nombre.value,
                'Password':password.value,
                'Correo':email.value,
                'rol':1
            };            
            registraUsuario(objeto); 
            
            
            
            
           
            
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
            respuesta.style.display="block";
            respuesta.textContent="Resultado: "+datos.result+" id de usuario: "+datos.user_id;
            //vamos a almacenar el id de usuario, que podemos usar en el formulario2
            
            
            
            

            
        })  

}

metodoPago.addEventListener("click",function(){

    window.location.href = 'pago.html';

})

login.addEventListener("click",function(){

    window.location.href = 'login.html';


})



/*





function mostrarPlazas(datos)
{
    //creamos una fila por cada 50 resultados
    let fila=tablaPlazas.insertRow();
    
    for(let i=0;i<datos.length;i++)
    {
        //cada 25 plazas insertamos la fila a la tabla
        if((i+1)%25==0)
        {
            tablaPlazas.appendChild(fila)
            //borramos el contenido de la fila
            fila.innerHTML="";
        }
        let celda=fila.insertCell();
        if(datos[i].disponible==1)
        {
            celda.classList.add("disponible");
            celda.textContent=datos[i].número_plaza;
        }
        fila.appendChild(celda);

    }

}
*/
mostrarPass.addEventListener("click",function() {
    
    const tipo=password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute("type", tipo);

})