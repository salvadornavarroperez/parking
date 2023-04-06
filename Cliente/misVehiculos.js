// variable usuario de storage
var usuario = JSON.parse(localStorage.getItem("Datos_usuario"));
var id_usuario = usuario["Id_usuario"]; 

// div de vehiculos
var vehiculos = document.getElementById("vehiculos");

fetch("http://localhost/Proyecto/parking/Vehiculos.php?usuario=" + id_usuario)
.then(respuesta=>respuesta.json())
.then(datos=>{

    var matriculas = Array.from(datos.matriculas);
    matriculas.forEach(m => {
        var matricula = document.createElement("li");
        matricula.className = "list-group-item";
        matricula.textContent = m.matricula + " ";
        matricula.style = "color:blue;";
        var borrar = document.createElement("button");
        borrar.className="btn btn-secondary";
        borrar.style = "background-color:red;";
        borrar.textContent = "Borrar"
        matricula.appendChild(borrar);
        vehiculos.append(matricula);
    })
})