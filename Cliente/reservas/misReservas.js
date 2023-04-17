// variable usuario de storage
var usuario = JSON.parse(localStorage.getItem("Datos_usuario"));
var id_usuario = usuario["Id_usuario"]; 

// div de vehiculos
var vehiculos = document.getElementById("reservas");

fetch("http://localhost/Proyecto/parking/reservas.php?id_usuario=" + id_usuario)
.then(respuesta=>respuesta.json())
.then(datos=>{

    var reservas = Array.from(datos.reserva);
    reservas.forEach(m => {
        var reserva = document.createElement("li");
        reserva.classList.add( "list-group-item");
        reserva.classList.add("list-group-item-action");

        var fechaCompletaE = new Date(m.hora_entrada);

        var fechaE = fechaCompletaE.toISOString().slice(0, 10);

        var horaE = fechaCompletaE.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        var fechaCompletaS = new Date(m.hora_salida);

        var fechaS = fechaCompletaS.toISOString().slice(0, 10);

        var horaS = fechaCompletaS.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        reserva.innerHTML = "  <b>Plaza: </b>" + m.id_plaza + 
                            ", <b>Fecha de la reserva: </b>" + m.fecha + 
                            ", <b>Entrada: </b>" + fechaE + 
                            ", <b>Hora de entrada: </b>" + horaE +
                            ", <b>Salida: </b>" + fechaS + 
                            ", <b>Hora de salida: </b>" + horaS + 
                            ", <b>Importe:  </b>" + m.importe + "€ ";     

        var borrar = document.createElement("button");
        borrar.className="btn btn-secondary";
        borrar.style = "background-color:red;";
        borrar.textContent = "Anular reserva"
        reserva.appendChild(borrar);
        vehiculos.append(reserva);
        borrar.addEventListener("click", function() {

            fetch("http://localhost/Proyecto/parking/reservas.php?Id_reserva=" + m.Id_reserva, {
                method: 'DELETE'
              })
                .then(response => {
                  if (response.ok) {
                    location.reload();                   
                  }
                })
        })
    })
})