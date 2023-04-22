import { comprobar } from './commons.js';
comprobar();
var infoUsuario = document.getElementById('infoUsuario')

var datos_usuario = JSON.parse(localStorage.getItem('Datos_usuario'));

infoUsuario.innerHTML = `<p>
                        Nombre: <b>${datos_usuario.Nombre}<br>
                        Correo: <b>${datos_usuario.Correo}<br>
                        </p>`