import { comprobar} from "../commons.js";

comprobar();

var matricula = document.getElementById("matricula");
var container = document.getElementById("container");
var formulario = document.getElementById("formulario");
var popupDiv =  document.createElement('div');
let precio = parseInt(localStorage.getItem("t2"));

popupDiv.className = 'popup';
popupDiv.textContent = 'No hay reservas con esa matricula';
popupDiv.style.position = 'fixed';
popupDiv.style.top = '50%';
popupDiv.style.left = '50%';
popupDiv.style.transform = 'translate(-50%, -50%)';
popupDiv.style.padding = '20px';
popupDiv.style.backgroundColor = '#fff';
popupDiv.style.border = '1px solid #ccc';
popupDiv.style.borderRadius = '5px';
popupDiv.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
popupDiv.style.zIndex = '9999';

var popupPago = document.createElement('div');
popupPago.className = 'popup';
popupPago.style.position = 'fixed';
popupPago.style.top = '50%';
popupPago.style.left = '50%';
popupPago.style.transform = 'translate(-50%, -50%)';
popupPago.style.padding = '20px';
popupPago.style.backgroundColor = '#fff';
popupPago.style.border = '1px solid #ccc';
popupPago.style.borderRadius = '5px';
popupPago.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
popupPago.style.zIndex = '9999';

var popupAdios = document.createElement('div');
popupAdios.className = 'popup';
popupAdios.textContent = 'Hasta Pronto';
popupAdios.style.position = 'fixed';
popupAdios.style.top = '50%';
popupAdios.style.left = '50%';
popupAdios.style.transform = 'translate(-50%, -50%)';
popupAdios.style.padding = '20px';
popupAdios.style.backgroundColor = '#fff';
popupAdios.style.border = '1px solid #ccc';
popupAdios.style.borderRadius = '5px';
popupAdios.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
popupAdios.style.zIndex = '9999';


function obtenerUsuario() {
    container.innerHTML=""

    fetch("http://localhost/Proyecto/parking/vehiculos.php?matricula=" + matricula.value)
    .then(respuesta=>respuesta.json())
    .then(datos=>{
        var user = Array.from(datos.matriculas)
       
       
        if(user.length == 0) {
            document.body.appendChild(popupDiv)
        } else {
   
            fetch("http://localhost/Proyecto/parking/reservas.php?id_usuario=" + user[0].usuario)
            .then(respuesta=>respuesta.json())
            .then(datos=>{
        
            var reservas = Array.from(datos.reserva);
            reservas.forEach(m => {
               
                var reserva = document.createElement("div");
                reserva.classList.add("cuadrado");                
        
                var fechaCompletaE = new Date(m.hora_entrada);
                var fechaE = fechaCompletaE.toISOString().slice(0, 10);
                var horaE = fechaCompletaE.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                var fechaCompletaS = new Date(m.hora_salida);
                var fechaS = fechaCompletaS.toISOString().slice(0, 10);
                var horaS = fechaCompletaS.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
                reserva.innerHTML = "<b>Plaza nº </b>" + m.id_plaza + "<br>" +
                                    "<b>Fecha de la reserva: </b>" + m.fecha + "<br>" +
                                    "<b>Entrada: </b>" + fechaE + 
                                    "<b> a las </b>" + horaE +"<br>" +
                                    "<b>Salida: </b>" + fechaS +
                                    "<b> a las </b>" + horaS +  "<br>" +
                                    "<b>Importe:  </b>" + m.importe + "€ <br>";         
                                    var borrar = document.createElement("button");
                                    borrar.className="btn btn-secondary";
                                    borrar.style = "background-color:red;";
                                    borrar.textContent = "Salir"
                                    reserva.appendChild(borrar);
                                    borrar.addEventListener("click", function() {
                                        {
                                            var salida = new Date(fechaCompletaS);
                                            var ahora = new Date();


                                            if (ahora < salida) {
                                                popupPago.remove();
                                                document.body.append(popupAdios);
                                                reserva.innerHTML = ""                                                                         

                                            } else {
                                                var importe = 0;
                                                let cuerpoPUT={}
                                                

                                                var texto = ""
                                                // Calcula la diferencia en milisegundos entre las dos fechas
                                                var diferenciaMilisegundos = ahora - salida;

                                                // Convierte la diferencia de milisegundos a días
                                                var diasPasados = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
                                                if(diasPasados > 1) {
                                                    importe =  parseFloat(m.importe) + parseFloat(diasPasados*precio)
                                                    cuerpoPUT={
                                                        "Id_reserva":parseInt(m.Id_reserva),                                                   
                                                        'importe': importe
                                                    }

                                                    texto =  "Has salido más tarde de la hora reservada, se te ha hecho un cargo de " + diasPasados + " días ("
                                                    + diasPasados*precio + "€) en la reserva";
                                                } else {
                                                    importe =  parseFloat(m.importe) + parseFloat(precio)
                                                    cuerpoPUT={      
                                                        "Id_reserva":parseInt(m.Id_reserva),                                                   
                                                        'importe': importe
                                                    }

                                                    texto =  "Has salido más tarde de la hora reservada, se te ha hecho un cargo de un día (" + precio + "€) en la reserva";
                                                }

                                                let optionsPUT={
                                                    method: "PUT",
                                                    headers:{'Content-type':'aplication/json'},
                                                    body:JSON.stringify(cuerpoPUT)
                                                }

                                                fetch("http://localhost/Proyecto/parking/reservas.php?Id_reserva=" +parseInt( m.Id_reserva), optionsPUT)

                                                popupPago.textContent = texto
                                                popupAdios.remove();
                                                document.body.append(popupPago);    
                                               reserva.innerHTML = ""                                                                         
                                            }
                                        }
                                    })                                                       
                    container.append(reserva)
                })       
            })   
        }         
    })
}

function mostrarPopup() {
    popupDiv.remove();
    popupAdios.remove();
    popupPago.remove();
    var popup = document.createElement("div");
    popup.classList.add("popup");

    var loader = document.createElement("div");
    loader.classList.add("loader");

    var message = document.createElement("div");
    message.innerHTML = "Leyendo matrícula...";

    popup.appendChild(loader);
    popup.appendChild(message);

    document.body.appendChild(popup);

    setTimeout(function() {
      popup.remove();
      obtenerUsuario();
    }, 1000);
}

  formulario.addEventListener("submit",(event)=>{

    event.preventDefault();
    mostrarPopup();
})