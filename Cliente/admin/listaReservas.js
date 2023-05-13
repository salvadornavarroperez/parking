// Obtener los usuarios desde la API
fetch('http://localhost/Proyecto/parking/reservas.php')
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector('#tabla-reservas tbody');

    console.log(data)

    // faltaria añadir la condicion si no hay reservas
    data.reserva.forEach(reserva => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td><input type="text" class="form-control" name="Reserva" value="${reserva.Id_reserva}" readonly></td>
        <td><input type="text" class="form-control" name="Usuario" value="${reserva.id_usuario}"></td>
        <td><input type="text" class="form-control" name="Plaza" value="${reserva.id_plaza}"></td>
        <td><input type="text" class="form-control datepicker" name="Fecha" value="${reserva.fecha}"></td>
        <td><input type="text" class="form-control" name="HoraEntrada" value="${reserva.hora_entrada.substring(11, 16)}"></td>
        <td><input type="text" class="form-control" name="HoraSalida" value="${reserva.hora_salida.substring(11, 16)}"></td>
        <td><input type="text" class="form-control" name="Importe" value="${reserva.importe}"></td>
        <td>
        <div class="d-flex justify-content-center">
            <button class="btn btn-sm btn-danger eliminar" data-id="${reserva.Id_reserva}">Eliminar</button>
        </div>
        </td>

      `;
      tbody.appendChild(tr);
    });
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
      });

    // Agregar eventos a los botones de "Actualizar" y "Eliminar"
    const botonesActualizar = document.querySelectorAll('.actualizar');
    /*
    botonesActualizar.forEach(boton => {
        boton.addEventListener('click', () => {
          const id_reserva = boton.getAttribute('data-id');
          const id_usuario = boton.parentNode.parentNode.querySelector('input[name="Usuario"]').value;
          const plaza = boton.parentNode.parentNode.querySelector('input[name="Plaza"]').value;
          const fechaReserva = boton.parentNode.parentNode.querySelector('input[name="Fecha"]').value;
          console.log(fechaReserva)
          const horaEntrada = boton.parentNode.parentNode.querySelector('input[name="HoraEntrada"]').value;
          const horaSalida = boton.parentNode.parentNode.querySelector('input[name="HoraSalida"]').value;
          const importe = boton.parentNode.parentNode.querySelector('input[name="Importe"]').value;
          const cuerpo = {
            "Id_reserva": id_reserva,
            "fecha": fechaReserva,
            "hora_entrada": horaEntrada,
            "hora_salida": horaSalida,
            "id_plaza": plaza,
            "id_usuario": id_usuario,
            "importe": importe
          };
          const options = {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(cuerpo)
          };
          fetch(`http://localhost/Proyecto/parking/reservas.php?Id_reserva=${id_reserva}`, options)
            .then(response => {
              if (response.ok) {
                alert("Los cambios de la reserva se han realizado correctamente");
                location.reload();
              } else {
                alert("Error al actualizar la reserva");
              }
            })
            
            .catch(error => console.log(error));
        });
      });
      */

    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach(boton => {
      boton.addEventListener('click', () => {
        const id_reserva = boton.getAttribute('data-id');
        const options = {
          method: "DELETE"
        };
        fetch(`http://localhost/Proyecto/parking/reservas.php?Id_reserva=${id_reserva}`, options)
          .then(response => {
            if (response.ok) {
              alert("La reserva se ha eliminado correctamente");
              location.reload();
            } else {
                alert("Error al eliminar la reserva");
            }
          })
          .catch(error => console.log(error));
      });
    });
  })
  .catch(error => console.log(error));

const searchReserva = document.querySelector('#search-reserva');
const searchUsuario = document.querySelector('#search-usuario');
const searchPlaza = document.querySelector('#search-plaza');

searchReserva.addEventListener('input', () => {
    buscarReservas(searchReserva.value, searchUsuario.value, searchPlaza.value);
});

searchUsuario.addEventListener('input', () => {
    buscarReservas(searchReserva.value, searchUsuario.value, searchPlaza.value);
});

searchPlaza.addEventListener('input', () => {
    buscarReservas(searchReserva.value, searchUsuario.value, searchPlaza.value);
});

function buscarReservas(reserva, usuario, plaza) {
    const filas = document.querySelectorAll('#tabla-reservas tbody tr');
  
    // Convertir la lista de filas en un array para usar el método filter
    const filasArray = Array.from(filas);
  
    // Filtrar las filas que coinciden con la búsqueda
    const filasFiltradas = filasArray.filter(fila => {
      const idReserva = fila.querySelector('input[name="Reserva"]').value;
      const idUsuario = fila.querySelector('input[name="Usuario"]').value;
      const idPlaza = fila.querySelector('input[name="Plaza"]').value;
  
      return idReserva.includes(reserva) && idUsuario.includes(usuario) && idPlaza.includes(plaza);
    });
  
    // Ocultar todas las filas y mostrar solo las filas filtradas
    filasArray.forEach(fila => {
      fila.style.display = 'none';
    });
  
    filasFiltradas.forEach(fila => {
      fila.style.display = '';
    });
  }
  