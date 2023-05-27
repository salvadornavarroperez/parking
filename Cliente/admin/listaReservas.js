import { comprobar, esAdmin } from "../commons.js";

comprobar();
esAdmin();

// llamamos a la api
fetch('http://localhost/Proyecto/parking/reservas.php')
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector('#tabla-reservas tbody');

    // Obtener los id_usuario únicos de las reservas
    const userIds = Array.from(new Set(data.reserva.map(reserva => reserva.id_usuario)));

    // Realizar una solicitud individual para cada id_usuario para obtener los nombres de usuario
    const userPromises = userIds.map(userId =>
      fetch(`http://localhost/Proyecto/parking/usuarios.php?Id_usuario=${userId}`)
        .then(response => response.json())
        .then(userData => ({ userId, userName: userData.usuarios[0].Nombre }))
    );

    //esperamos a todas las solicitudes
    Promise.all(userPromises)
      .then(users => {
        const usersMap = {};
        users.forEach(user => {
          usersMap[user.userId] = user.userName;
        });

        data.reserva.forEach(reserva => {
          console.log(reserva.Id_reserva)
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><span>${reserva.Id_reserva}</span></td>
            <td><input type="text" class="form-control" name="Usuario" value="${usersMap[reserva.id_usuario]}"></td>
            <td><input type="text" class="form-control" name="Plaza" value="${reserva.id_plaza}"></td>
            <td><input type="text" class="form-control" name="Fecha" value="${reserva.fecha}"></td>
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

  // creamos array
  const filasArray = Array.from(filas);

  // Filtrar las filas que coinciden con la búsqueda
  const filasFiltradas = filasArray.filter(fila => {
    const idReserva = fila.querySelector('input[name="Reserva"]').value;
    const idUsuario = fila.querySelector('input[name="Usuario"]').value;
    const idPlaza = fila.querySelector('input[name="Plaza"]').value;

    return idReserva.includes(reserva) && idUsuario.includes(usuario) && idPlaza.includes(plaza);
  });

  // mostramos solo las filas filtradas
  filasArray.forEach(fila => {
    fila.style.display = 'none';
  });

  filasFiltradas.forEach(fila => {
    fila.style.display = '';
  });
}
