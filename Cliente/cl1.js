//recojo los valores del formulario
const formulario=document.querySelector("#formulario1");
let respuesta=document.querySelector("#respuesta");
let formulario2=document.querySelector("#formulario2")
let seleccionaSocio=document.querySelector("#selecciona")
let tablaPlazas=document.querySelector("#plazas")
formulario.addEventListener("submit",(event)=>{

    //evitamos el envio de datos
    event.preventDefault();
    //recogemos los datos del formulario
    let nombre=document.querySelector("#nombre");
    let nombErr=document.querySelector("#nombErr");
    let password=document.querySelector("#password");
    let passErr=document.querySelector("#passErr");
    let email=document.querySelector("#email");
    let emailErr=document.querySelector("#emailErr");
    let select=document.querySelector("#rol");

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
        
          //formamos el objeto que vamos a enviar por post para que la api rest haga un post
            const objeto={
                'nombre':nombre.value,
                'password':password.value,
                'correo':email.value,
                'rol':select.value
            }
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
            console.log(datos)
            formulario2.style.display="block";
            seleccionaSocio.style.display="block";

            
        })  

    }

    
})

seleccionaSocio.addEventListener("change",(event)=>{

    if(event.target.value=="si")
    {
        //mostramos los demas controles de formulario para mostrar las plazas
        //hay que saber el número de páginas que se desea mostrar, pero la cuenta es 50 resultados por pagina
        fetch("http://localhost/Proyecto/parking/plazas.php?page=4")
        .then(respuesta=>respuesta.json())
        .then(datos=>{

            
            console.log(datos);


        })

    }
})

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
