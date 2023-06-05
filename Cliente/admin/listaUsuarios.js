import { comprobar, esAdmin} from "../commons.js";
comprobar();
esAdmin()
document.body.style.backgroundImage = "url('../imagenes/textura-acero.png')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
fetch('http://localhost/Proyecto/parking/usuarios.php')
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector('#tabla-usuarios tbody');

    // falta añadir la condicion si no hay usuarios registrados
    data.usuarios.forEach(usuario => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${usuario.Id_usuario}</td>
        <td><input type="text" class="form-control" name="Nombre" value="${usuario.Nombre}"></td>
        <td><input type="text" class="form-control" name="Correo" value="${usuario.Correo}"></td>
        <td>
            <select class="form-control" name="Rol">
                <option value="1" ${usuario.rol == 1 ? 'selected' : ''}>Usuario</option>
                <option value="2" ${usuario.rol == 2 ? 'selected' : ''}>Socio</option>
                <option value="3" ${usuario.rol == 3 ? 'selected' : ''}>Admin</option>
            </select>
        </td>
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
          fetch(`http://localhost/Proyecto/parking/usuarios.php?Id_usuario=${id}`, options)
            .then(response => {
              if (response.ok) {
                alert("Los cambios de usuario se han realizado correctamente");
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
              alert("El usuario se ha eliminado correctamente");
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
  }
  