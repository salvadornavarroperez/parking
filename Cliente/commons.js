//con esta función simplemente comprobamos que existe el token en localstorage y apartecada 30 minutos(1800000 ms) borramos el token y vuelve a llamar a la función de comprobación de token
const regexPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;


export function comprobar()
{
    if(localStorage.getItem('token')===null)
    {
        window.location.href = 'http://localhost/Proyecto/parking/Cliente/login.html';

    }

    setTimeout(function(){

        //borramos el token y los datos de usuario del localStorage
        localStorage.removeItem("token")
        localStorage.removeItem("usuario")
        comprobar()
    },1800000)

}

export function esAdmin(){
    let user = JSON.parse(localStorage.getItem('Datos_usuario'))
    let id_user = user.Id_usuario
    fetch("http://localhost/Proyecto/parking/usuarios.php?Id_usuario=" + id_user)
    .then(respuesta => respuesta.json())
    .then(datos => {
      console.log(datos.usuarios[0].rol)
      if (datos.usuarios[0].rol != '3'){
        console.log('estoy dentro')
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
      }
    })
}

export function updateLocalStorage(id,nombre,correo,rol)
{
const usuario={
    "Id_usuario":id,
    "Nombre":nombre,
    "Correo":correo,
    "rol":rol
}            
localStorage.setItem("Datos_usuario",JSON.stringify(usuario));
}

export function testPassword(password)
{
    return regexPassword.test(password);
}