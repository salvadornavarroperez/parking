let plano = document.querySelector('#plano')
let reservar = document.querySelector('#reservar')
const fechaEntradaInput = document.getElementById('fechaEntrada');
const fechaSalidaInput = document.getElementById('fechaSalida');

fechaEntradaInput.value = new Date().toISOString().split("T")[0];
fechaSalidaInput.value = new Date().toISOString().split("T")[0];

fechaEntradaInput.addEventListener('input', verDisponibles);
fechaSalidaInput.addEventListener('input', verDisponibles);

// variables globales de fechas y horas de entrada y salida
var fechaEntrada;
var fechaSalida;
verDisponibles();

reservar.addEventListener('click',()=>{
    
localStorage.removeItem('plaza');
let plaza = document.querySelector('.marcado')

if(!plaza){
    alert('Debes seleccionar una plaza')
}else{
    const reservaPlaza={
        "plaza":plaza.id
     }            
     localStorage.setItem("plaza",JSON.stringify(reservaPlaza));
     localStorage.setItem("fechaE",JSON.stringify(fechaEntradaInput.value));
     localStorage.setItem("fechaS",JSON.stringify(fechaSalidaInput.value));
     window.location = "../Cliente/reservas/nuevaReserva.html"
}

})

plano.addEventListener('click',(e)=>{
    if(e.target.classList.contains('libre')){
        desmarcar()
        e.target.classList.add('marcado')
    }   
})

function verDisponibles(){
// Obtener las fechas de entrada y salida del formulario
fechaEntrada = new Date(fechaEntradaInput.value);
fechaSalida = new Date(fechaSalidaInput.value);

    // Calcular la cantidad de días entre las dos fechas
    const diferenciaTiempo = fechaSalida - fechaEntrada;
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

    if (diferenciaDias < 0) {
        // Mostrar un mensaje emergente si la fecha de entrada es mayor que la fecha de salida
        alert('La fecha de entrada debe ser menor a la fecha de salida y la reserva será minimo de un dia.');     
        reservar.disabled = true;
    } else {       
        reservar.disabled = false;

        // pintar disponibles segun fetch a reserva fecha
        fetch("http://localhost/Proyecto/parking/reservaFecha.php?fechaE=" + fechaEntrada.toISOString().split("T")[0]  + "&fechaS=" + fechaSalida.toISOString().split("T")[0])
        .then(respuesta=>respuesta.json())
        .then(datos=>{      

            var ocupadas = Array.from(datos.reserva);
            var valoresPlaza = ocupadas.map(objeto => parseInt(objeto.id_plaza));
            
            fetch("http://localhost/Proyecto/parking/plazas.php")
            .then(respuesta=>respuesta.json())
            .then(datos=>{
                var plazas = Array.from(datos.plazas);
                plazas.forEach(pl => {                        
                    if(valoresPlaza.includes(parseInt(pl.Id_plaza)) || pl.disponible === '0'){
                        ocupada(pl.Id_plaza);              
                    } else {
                        libre(pl.Id_plaza);
                    }
                });
            }) 
        }) 
    }
}

function ocupada(numPlaza){
    let plaza = document.getElementById(`${numPlaza}`);
    plaza.classList.remove('libre');
    plaza.classList.add('ocupada');
}

function libre(numPlaza){
    let plaza = document.getElementById(`${numPlaza}`);
    plaza.classList.remove('ocupada');
    plaza.classList.add('libre');
}

function desmarcar(){
    let plazas = document.querySelectorAll('.parking-spot')
    plazas.forEach(pl => {
        pl.classList.remove('marcado')
    })
}