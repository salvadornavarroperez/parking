// variable usuario de storage
var usuario = JSON.parse(localStorage.getItem("Datos_usuario"));
var id_usuario = usuario["Id_usuario"]; 

const formulario = document.querySelector("#formulario")
let matricula = document.querySelector("#matricula");
let error = document.querySelector("#error");

const regexMatricula = /^(ES|es)?[0-9]{4}[ -]?[BCDFGHJKLMNPRSTVWXYZ]{3}$/i;

formulario.addEventListener("submit", function(event){

    //captamos el envio de datos
    event.preventDefault();

    if(!regexMatricula.test(matricula.value))
    {
        // comprobamos
        error.textContent="El formato debe ser 4 numeros seguidos de 3 letras";
        error.style = "color:red;"
    }

    if(regexMatricula.test(matricula.value)) {
    //montamos el cuerpo del objeto
    var matriculaPOST = matricula.value;
    let cuerpo={       
        "usuario" : id_usuario,
        "matricula" : matriculaPOST.toUpperCase()
    }

    let options={
        method: "POST",
        headers:{'Content-type':'aplication/json'},
        body:JSON.stringify(cuerpo)
    }

    fetch("http://localhost/Proyecto/parking/Vehiculos.php", options)
    .then(respuesta=>respuesta.json())
    .then(datos=>{

        console.log(datos)
        if(datos.result==="ok") {
            window.location.href = 'misVehiculos.html';
        }
    })        
    }
})