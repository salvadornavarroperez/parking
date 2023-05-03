//elementos del html registro socio
let plaza = document.getElementById("plaza");
let botonSocio = document.getElementById("botonSocio");
let checkSocio = document.getElementById("checkSocio");
let selectPlazasDiv = document.getElementById("selectPlazasDiv");
let precioDiv = document.getElementById("precio");

// texto que sale si quieres plaza fija
var textoSelectPlazas = document.createElement("h4");
textoSelectPlazas.textContent = "Elija una plaza del parking";

//variables monto
var precio = 0;

// variables globales y boton de hacerse socio desactivado
botonSocio.disabled = true;
var metodoPago = false;
var plazaFija = false;

//select de las plazas
var selectPlazas = document.createElement("select");
selectPlazas.classList.add("container")

// por defecto van sin aparecer en el documento
textoSelectPlazas.hidden = true;
selectPlazas.hidden = true;

// div padre para añadir o quitar segun tenga tarjeta metida o no
var divMetodoPago = document.createElement("div");
divMetodoPago.classList.add("container");

// h4 de informacion
var divPago = document.createElement("h4");
divPago.innerHTML = "<h3>Usted no tiene un método de pago actualizado</h3>"
divPago.style.color = "red";

// enlace al formulario de metodo de pago
var formPago = document.createElement("a");
formPago.textContent = "Introducir un método de pago"
formPago.href = "../pago.html"

// añadir los divs al body, si tiene tarjeta se borra
divMetodoPago.append(divPago, formPago);

// variable usuario de storage, esto es la polla
var usuario = JSON.parse(localStorage.getItem("Datos_usuario"));
var id_usuario = usuario["Id_usuario"]; 

// select de plazas
selectPlazasDiv.append(textoSelectPlazas, selectPlazas);

// numero de plaza aleatoria si no quiere plaza fija
var plazaAleatoria = -1;
var value = -1;

// llamada para saber si tiene tarjeta
fetch("http://localhost/Proyecto/parking/metodo_pago.php?usuario=" + id_usuario)
.then(respuesta=>respuesta.json())
.then(datos=>{

    // comprobar que recibimos datos de tarjetas o no
    var tarjeta = Array.from(datos.metodo_pago);
    console.log(tarjeta.length)

    if(tarjeta.length == 0) {
        metodoPago = false;
    } else if( tarjeta.length > 0) {
        metodoPago = true;
    }
    console.log(metodoPago);
    if(!metodoPago) {
        document.body.appendChild(divMetodoPago);
    }
}) 

// obtener plazas libres del parking
fetch("http://localhost/Proyecto/parking/plazas.php?disponible=1")
.then(respuesta=>respuesta.json())
.then(datos=>{

    // comprobamos que hay plazas libres
    var plazas = Array.from(datos.plazas);
    console.log(plazas.length)

    if(plazas.length == 0) {
       console.log("Pues te has quedao sin plaza amigo")
    } else {
        
        // plaza aleatoria si no se quiere fija
        let randomIndex = Math.floor(Math.random() * plazas.length);
        let randomNum = plazas[randomIndex];
        plazaAleatoria = randomNum['Id_plaza'] 
        console.log(plazaAleatoria);

        //designar una plaza y ponerlo en el select
        plazas.forEach(pl => {
            var opcionPlaza = document.createElement("option");
            opcionPlaza.value = pl.numero_plaza
            opcionPlaza.textContent = "Plaza " + pl.numero_plaza;
            selectPlazas.append(opcionPlaza);                    
        });
    }
  
}) 

function activarBoton() {
            
    // comprobar que tiene metodo de pago
    if (checkSocio.checked && metodoPago && plaza.value != "x") {
        botonSocio.disabled = false;
    } else {
        botonSocio.disabled = true;
    }
  }

plaza.addEventListener("change", function() {
    if(plaza.value == "si") {        
        textoSelectPlazas.hidden = false;
        selectPlazas.hidden = false;
        precio = 300;
        precioDiv.textContent = `Precio: ${precio} €`;
    } else if (plaza.value == "no"){        
        textoSelectPlazas.hidden = true;
        selectPlazas.hidden = true;
        precio = 250;
        precioDiv.textContent = `Precio: ${precio} €`;

    }
  })

// llamada a api socios para crear un nuevo socio con el usuario logeado



botonSocio.addEventListener("click", function(){
    var plazaPOST = selectPlazas.value;
    if(plaza.value == "si") {
        plazaFija = 1;
    } else if(plaza.value = "no") {
        plazaFija = 0;
        plazaPOST = plazaAleatoria;
        console.log(id_usuario + ", " + plazaFija + ", " + plazaPOST);
    }

    let cuerpo={
        'Id_usuario': id_usuario,       
        'plaza_fija': plazaFija, 
        'id_plaza' : plazaPOST
    }
    
    let options={
        method: "POST",
        headers:{'Content-type':'aplication/json'},
        body:JSON.stringify(cuerpo)
    }

    let cuerpoPUT={
        'disponible': 0
    }
    
    let optionsPUT={
        method: "PUT",
        headers:{'Content-type':'aplication/json'},
        body:JSON.stringify(cuerpoPUT)
    }

    let cuerpoFecha={
        'fecha': new Date(),
    }
    
    let optionsFecha={
        method: "POST",
        headers:{'Content-type':'aplication/json'},
        body:JSON.stringify(cuerpoFecha)
    }
    
    //montamos el cuerpo del objeto
    fetch("http://localhost/Proyecto/parking/socios.php",options)
    .then(respuesta=>respuesta.json())
    .then(datosS=>{
    
        if(datosS.result==="ok") {       
            var fetchss
            if(plaza.value == "si") {

                fetchss = "http://localhost/Proyecto/parking/plazas.php?numero_plaza=" + selectPlazas.value; 

            } else {

                fetchss = "http://localhost/Proyecto/parking/plazas.php?numero_plaza=" + plazaAleatoria;

            }


            // si tenemos resuesta ok entonces ponemos la plaza a no disponible
            fetch(fetchss, optionsPUT)
            .then(respuesta=>respuesta.json())
            .then(datos=>{

                fetch("http://localhost/Proyecto/parking/fecha.php", optionsFecha)
                .then(respuesta=>respuesta.json())
                .then(datos=>{

                    let cuerpoPOST={
                        'id_socio': datosS.socio,
                        'id_fecha': datos.fecha,
                        'monto' : precio        
                    }
                    
                    let optionsPOST={
                        method: "POST",
                        headers:{'Content-type':'aplication/json'},
                        body:JSON.stringify(cuerpoPOST)
                    }

                    fetch("http://localhost/Proyecto/parking/pago_socios.php", optionsPOST)
                    .then(respuesta=>respuesta.json())
                    .then(datos=>{
                    
                        if(datos.result==="ok") {       
                            // si tenemos resuesta ok entonces vamos al inicio
                            if (confirm("Pago realizado con exito")) {
                                window.location.href = '../inicio.php';    
                            }
                        } else {
                            console.log("hemos pinchao primo");
                        }            
                    })            
                })                   
            })          
        }    
    }) 
})