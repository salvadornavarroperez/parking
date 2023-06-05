import { comprobar, esAdmin} from "../commons.js";
comprobar();
esAdmin()
document.body.style.backgroundImage = "url('../imagenes/textura-acero.png')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
fetch('http://localhost/Proyecto/parking/tarifas.php')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#tabla-tarifas tbody');

    data.tarifas.forEach(tarifa => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="text" class="form-control" name="id_Tarifa" value="${(tarifa.id_tarifa == 1) ? 'Laborables' : 'Festivos'}" readonly></td>
        <td><input type="number" class="form-control" name="precio" value="${tarifa.precio}"></td>
        <td>
          <button class="btn btn-sm btn-primary actualizar" data-id="${tarifa.id_tarifa}">Actualizar</button>
        </td>
      `;
      tableBody.appendChild(tr);

      const updateButton = tr.querySelector('.actualizar');
      updateButton.addEventListener('click', () => {
        const inputPrecio = tr.querySelector('input[name="precio"]');
        const nuevoPrecio = inputPrecio.value;
        const idTarifa = updateButton.dataset.id;
        const cuerpo = {
          "id_tarifa": idTarifa,
          "precio": nuevoPrecio,
        };
        const options = {
          method: "PUT",
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(cuerpo)
        };
        fetch(`http://localhost/Proyecto/parking/tarifas.php?id_tarifa=${idTarifa}`, options)
          .then(response => {
            if (response.ok) {
              alert("Los cambios de tarifa se han realizado correctamente");
              location.reload();
            } else {
              console.log('Error al actualizar la tarifa');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });
    });
  });
