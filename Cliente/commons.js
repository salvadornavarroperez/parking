//con esta función simplemente comprobamos que existe el token en localstorage y apartecada 30 minutos(1800000 ms) borramos el token y vuelve a llamar a la función de comprobación de token
const regexPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;


export function comprobar()
{
    if(!localStorage.getItem('Datos_usuario'))
    {
        window.location.href = 'login.html';
    }
    let iguales=false;
    let datosLocalesUsuario=localStorage.getItem('Datos_usuario')
    const datosParseados=JSON.parse(datosLocalesUsuario)
    let id_user=datosParseados.Id_usuario
    //hacemos peticion al endpoint de usuarios
    fetch("http://localhost/Proyecto/parking/usuarios.php")
    .then(response  => response.json())
    .then(datos=>{
        let datosUsuario=datos.usuarios.filter(usuario=> usuario.Id_usuario===id_user)
        if(datosUsuario.length>0){

            if(datosUsuario[0].Token===localStorage.getItem('token'))
            {
                iguales=true;
            }

        }          
        if(!iguales)
        {
            window.location.href = 'login.html';

        }
        
    })

    

    setTimeout(function(){

        //borramos el token y los datos de usuario del localStorage
        localStorage.removeItem("token")
        localStorage.removeItem("usuario")
        comprobar()
    },1800000)

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