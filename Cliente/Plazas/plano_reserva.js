let plano = document.querySelector('#plano')
let reservar = document.querySelector('#reservar')
verDisponibles()

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
     window.location = "../reservas/nuevaReserva.html"
}

/*if(e.target.classList.contains('ocupada')){
    alert('esta plaza esta ocupada')
    }else{
        const reservaPlaza={
            "plaza":e.target.id
         }            
         localStorage.setItem("plaza",JSON.stringify(reservaPlaza));
    }*/
})

plano.addEventListener('click',(e)=>{
if(e.target.classList.contains('libre')){
    desmarcar()
    e.target.classList.add('marcado')
}
   
})

function verDisponibles(){
fetch("http://localhost/Proyecto/parking/plazas.php")
.then(respuesta=>respuesta.json())
.then(datos=>{
    var plazas = Array.from(datos.plazas);
    plazas.forEach(pl => {
        if(pl.disponible === '1'){
            ocupada(pl.Id_plaza)
        }else{
            libre(pl.Id_plaza)
        }            
    });
}) 
}

function ocupada(numPlaza){
let plaza = document.getElementById(`${numPlaza}`);
plaza.classList.add('ocupada');
}

function libre(numPlaza){
    let plaza = document.getElementById(`${numPlaza}`);
    plaza.classList.add('libre');
    }

function desmarcar(){
    let plazas = document.querySelectorAll('.parking-spot')
    plazas.forEach(pl => {
        pl.classList.remove('marcado')
    })
}