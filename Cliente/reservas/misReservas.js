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
        var reserva = document.createElement("div");
        //reserva.classList.add( "list-group-item");
        //reserva.classList.add("list-group-item-action");
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