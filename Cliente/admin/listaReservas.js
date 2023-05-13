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
        <td>${reserva.Id_reserva}</td>
        <td><input type="text" class="form-control" name="Usuario" value="${reserva.Id_reserva}"></td>
        <td><input type="text" class="form-control" name="Plaza" value="${reserva.id_plaza}"></td>
        <td><input type="text" class="form-control datepicker" name="Fecha" value="${reserva.fecha}"></td>
        <td><input type="text" class="form-control" name="HoraEntrada" value="${reserva.hora_entrada.substring(11, 16)}"></td>
        <td><input type="text" class="form-control" name="HoraSalida" value="${reserva.hora_salida.substring(11, 16)}"></td>
        <td><input type="text" class="form-control" name="Importe" value="${reserva.importe}"></td>
          <button class="btn btn-sm btn-primary actualizar" data-id="${reserva.Id_reserva}">Actualizar</button>
          <button class="btn btn-sm btn-danger eliminar" data-id="${reserva.Id_reserva}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
      });
/*
    // Agregar eventos a los botones de "Actualizar" y "Eliminar"
    const botonesActualizar = document.querySelectorAll('.actualizar');
    botonesActualizar.forEach(boton => {
        boton.addEventListener('click', () => {
          const id = boton.getAttribute('data-id');
          const nombre = boton.parentNode.parentNode.querySelector('input[name="Nombre"]').value;
          const correo = boton.parentNode.parentNode.querySelector('input[name="Correo"]').value;
          const rol = boton.parentNode.parentNode.querySelector('select[name="Rol"]').value;
          const cuerpo = {
            "Id_usuario": id,
            "Nombre": nombre,
            "Correo": correo,
            "rol": rol
          };
          const options = {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(cuerpo)
          };
          fetch(`http://localhost/Proyecto/parking/usuarios.php?Id_usuario=${id}&Nombre=${nombre}&Correo=${correo}`, options)
            .then(response => {
              if (response.ok) {
                alert("Los cambios de usuario se han realizado correctamente");
                location.reload();
              } else {
                console.log('Error al actualizar el usuario');
              }
            })
            
            .catch(error => console.log(error));
            
            document.getElementById("alerta").innerHTML = "Usuario editado/eliminado correctamente";
            document.getElementById("alerta").style.display = "block";
            setTimeout(function(){
            document.getElementById("alerta").style.display = "none";
}, 3000); // Ocultar la alerta después de 3 segundos
        });
      });
      

    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach(boton => {
      boton.addEventListener('click', () => {
        const id = boton.getAttribute('data-id');
        const options = {
          method: "DELETE"
        };
        fetch(`http://localhost/Proyecto/parking/usuarios.php?Id_usuario=${id}`, options)
          .then(response => {
            if (response.ok) {
              alert("El usuario se ha eliminado correctamente");
              location.reload();
            } else {
              console.log('Error al eliminar el usuario');
            }
          })
          .catch(error => console.log(error));
      });
    });*/
  })/*
  .catch(error => console.log(error));

  const searchNombre = document.querySelector('#search-nombre');
const searchCorreo = document.querySelector('#search-correo');

searchNombre.addEventListener('input', () => {
  buscarUsuarios(searchNombre.value, searchCorreo.value);
});

searchCorreo.addEventListener('input', () => {
  buscarUsuarios(searchNombre.value, searchCorreo.value);
});

function buscarUsuarios(nombre, correo) {
    const filas = document.querySelectorAll('#tabla-usuarios tbody tr');
  
    // Convertir la lista de filas en un array para usar el método filter
    const filasArray = Array.from(filas);
  
    // Filtrar las filas que coinciden con la búsqueda
    const filasFiltradas = filasArray.filter(fila => {
      const nombreUsuario = fila.querySelector('input[name="Nombre"]').value.toLowerCase();
      const correoUsuario = fila.querySelector('input[name="Correo"]').value.toLowerCase();
  
      return nombreUsuario.includes(nombre.toLowerCase()) && correoUsuario.includes(correo.toLowerCase());
    });
  
    // Ocultar todas las filas y mostrar solo las filas filtradas
    filasArray.forEach(fila => {
      fila.style.display = 'none';
    });
  
    filasFiltradas.forEach(fila => {
      fila.style.display = '';
    });
  }*/
  