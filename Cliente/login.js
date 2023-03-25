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
            localStorage.setItem("token",datos.token)
            window.location.href = 'inicio.html';



        }

    })        

})