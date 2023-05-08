// variable usuario de storage
var usuario = JSON.parse(localStorage.getItem("Datos_usuario"));
var id_usuario = usuario["Id_usuario"]; 

const formulario = document.getElementById('formulario');

// boton enviar

formulario.addEventListener("submit",(event)=>{

    event.preventDefault();
    eliminarSocio();


})

function eliminarSocio() {

    let cuerpoPUT={
        'disponible': 1
    }
    
    let optionsPUT={
        method: "PUT",
        headers:{'Content-type':'aplication/json'},
        body:JSON.stringify(cuerpoPUT)
    }
    
    // obtenemos el socio para borrarlo
    fetch("http://localhost/Proyecto/parking/socios.php?Id_usuario=" + id_usuario)
    .then(respuesta=>respuesta.json())
    .then(datosS=>{
    
        if(datosS.result==="ok") {     
            
            // si tenemos resuesta ok entonces borramos al socio
            fetch("http://localhost/Proyecto/parking/socios.php?id=" + datosS.socios[0].Id_Socio, {method: 'DELETE'})
            .then(respuesta=>respuesta.json())
            .then(datos=>{

                if(datos.result==="ok") {       
                // si el socio se ha borrado, ponemos su plaza a disponible
                fetch("http://localhost/Proyecto/parking/plazas.php?numero_plaza=" + datosS.socios[0].id_plaza, optionsPUT)
                .then(respuesta=>respuesta.json())
                .then(datosSS=>{
            
                        if(datosSS.result==="ok") {       
                            // si tenemos resuesta ok entonces vamos al inicio
                            alert("Hemos confirmado su baja como socio, recibirá su devolución en los próximos días");
                            window.location.href = '../inicio.php';    
                            
                        }                      
                    })  
                }                 
            })          
        }    
    }) 
}