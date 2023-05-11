// Obtener los usuarios desde la API
console.log('HOLA')
fetch('http://localhost/Proyecto/parking/usuarios.php')
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector('#tabla-usuarios tbody');

    // Iterar sobre los usuarios y construir la tabla HTML con campos editables
    data.usuarios.forEach(usuario => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${usuario.Id_usuario}</td>
        <td><input type="text" class="form-control" name="Nombre" value="${usuario.Nombre}"></td>
        <td><input type="text" class="form-control" name="Correo" value="${usuario.Correo}"></td>
        <td><input type="password" class="form-control" name="Password" value=""></td>
        <td>
          <button class="btn btn-sm btn-primary actualizar" data-id="${usuario.Id_usuario}">Actualizar</button>
          <button class="btn btn-sm btn-danger eliminar" data-id="${usuario.Id_usuario}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Agregar eventos a los botones de "Actualizar" y "Eliminar"
    const botonesActualizar = document.querySelectorAll('.actualizar');
    botonesActualizar.forEach(boton => {
      boton.addEventListener('click', () => {
        const id = boton.getAttribute('data-id');
        const nombre = boton.parentNode.parentNode.querySelector('input[name="Nombre"]').value;
        const correo = boton.parentNode.parentNode.querySelector('input[name="Correo"]').value;
        const cuerpo = {
          "Id_usuario": id,
          "nombre": nombre,
          "Correo": correo,
        };
        const options = {
          method: "PUT",
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(cuerpo)
        };
        fetch(`http://localhost/Proyecto/parking/usuarios.php?Id_usuario=${id}&Nombre=${nombre}&Correo=${correo}`, options)
          .then(response => {
            if (response.ok) {
              location.reload();
            } else {
              console.log('Error al actualizar el usuario');
            }
          })
          .catch(error => console.log(error));
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
              location.reload();
            } else {
              console.log('Error al eliminar el usuario');
            }
          })
          .catch(error => console.log(error));
      });
    });
  })
  .catch(error => console.log(error));
