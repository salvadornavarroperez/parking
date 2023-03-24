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
login.disabled=true;

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
                'password':password.value,
                'correo':email.value,
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
            
            if(datos.user_id!=null)
            {
                //guardamos el id del usuario
                sessionStorage.setItem('id', datos.user_id);
                //habilitamos los botones
                metodoPago.disabled=false;
                login.disabled=false;


            }
            
            
            

            
        })  

}

metodoPago.addEventListener("click",function(){

    window.location.href = 'pago.html';

})

login.addEventListener("click",function(){

    window.location.href = 'pago.html';


})



/*

function registraMetodoPago()
{
    //expresion regular para la tarjeta
    const regextarjeta=/^\d{16}$/
    const regexnombtarjeta=/^[a-zA-Z\s]+$/

    //vamos a crear los option para los valores de los meses de la fecha de caducidad de la tarejeta(meses y años)
    for(let i=1;i<=12;i++)
    {
        let option=document.createElement("option");
        option.value=i<10?"0"+i:i;
        option.textContent=i<10?"0"+i:i;
        mesTarjeta.appendChild(option);
    }

    for(let i=23;i<=32;i++)
    {
        let option=document.createElement("option");
        option.value="20"+i;
        option.textContent="20"+i;
        añoTarjeta.appendChild(option);
    }

    //montamos el la fecha de caducidad de la tarjeta para que sea válida para DATE mysql
    let fechaCaducidad=`${añoTarjeta.value}-${mesTarjeta.value-1}-01`;
    
    //comprobamos la validez de los valores de la tarjeta
    if(!regextarjeta.test(numTarjeta.value))
    {
        document.querySelector("#numTarErr").textContent="El número de tarjeta no es válido";
    }
    if(!regexnombtarjeta.test(nomTarjeta.value))
    {
        document.querySelector("#nomTarErr").textContent="El nombre de la tarjeta no es válido";

    }
    //si ambos son válidos montamos el cuerpo del fetch
    if(regextarjeta.test(numTarjeta.value)&&regexnombtarjeta.test(nomTarjeta.value))
    {
        //montamos el cuerpo del post
        const pago={
            'usuario':sessionStorage.getItem('id'),
            'numero_tarjeta':numTarjeta.value,
            'nombre_tarjeta':nomTarjeta.value,
            'fecha_caducidad':fechaCaducidad
        }

        let options={
            method: "POST",
            headers:{'Content-type':'aplication/json'},
            body:JSON.stringify(pago)
                }

        fetch("http://localhost/Proyecto/parking/metodo_pago.php",options)
        .then(respuesta=>respuesta.json())
        .then(datos=>{

                            console.log(datos);


        })        
    }




}



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