import {comprobar} from "../commons.js";
comprobar()
document.body.style.backgroundImage = "url('../imagenes/textura-acero.png')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
var usuario = JSON.parse(localStorage.getItem("Datos_usuario"));
var id_usuario = usuario["Id_usuario"]; 

// div de vehiculos
var vehiculos = document.getElementById("vehiculos");

fetch("http://localhost/Proyecto/parking/vehiculos.php?usuario=" + id_usuario)
.then(respuesta=>respuesta.json())
.then(datos=>{

    var matriculas = Array.from(datos.matriculas);
    matriculas.forEach(m => {
        var matricula = document.createElement("div");
        matricula.className = "list-group-item";
        matricula.classList.add("cuadrado");
        let primerosCuatro =  m.matricula.slice(0, 4);
        let restoDelString =  m.matricula.slice(4);
        let resultado = primerosCuatro + "-" + restoDelString;
        matricula.innerHTML = resultado + "<br> ";
        matricula.style = "color:black;";
        var borrar = document.createElement("button");
        borrar.className="btn btn-secondary";
        borrar.style = "background-color:red;";
        borrar.textContent = "Borrar"
        matricula.appendChild(borrar);
        vehiculos.append(matricula);
        borrar.addEventListener("click", function() {

            fetch("http://localhost/Proyecto/parking/vehiculos.php?matricula=" + "'"+ m.matricula + "'", {
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