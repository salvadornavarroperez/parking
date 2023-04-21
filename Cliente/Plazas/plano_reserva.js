
let reservar = document.querySelector('#plano')
verDisponibles()
reservar.addEventListener('click',(e)=>{
 console.log(e.target)


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