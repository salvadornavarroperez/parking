const formulario=document.querySelector("#formulario")
let correo=document.querySelector("#correo")
let password=document.querySelector("#password")

formulario.addEventListener("submit",function(event){

    //captamos el envio de datos
    event.preventDefault();

    let cuerpo={
        "Correo":correo.value,
        "Password":password.value
    }

    let options={
        method: "POST",
        headers:{'Content-type':'aplication/json'},
        body:JSON.stringify(cuerpo)
            }

    //montamos el cuerpo del objeto
    fetch("http://localhost/Proyecto/parking/auth.php",options)
    .then(respuesta=>respuesta.json())
    .then(datos=>{

        console.log(datos)
        if(datos.result==="ok")
        {
            //guradamos el token
            localStorage.setItem("token",datos.token)
            //guardamos los datos de usuario, pero primero lo guardamos en un objeto sin el token
            const usuario={
                "Id_usuario":datos.Id_usuario,
                "Nombre":datos.Nombre,
                "Correo":datos.Correo,
                "rol":datos.rol
            }            
            localStorage.setItem("Datos_usuario",JSON.stringify(usuario));            
            
            
            window.location.href = 'inicio.html';
            


        }

    })        

})