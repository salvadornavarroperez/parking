//con esta función simplemente comprobamos que existe el token en localstorage y apartecada 30 minutos(1800000 ms) borramos el token y vuelve a llamar a la función de comprobación de token
const regexPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;


export function comprobar()
{
    if(localStorage.getItem('token')===null)
    {
        window.location.href = 'login.html';

    }

    setTimeout(function(){

        //borramos el token y los datos de usuario del localStorage
        localStorage.removeItem("token")
        localStorage.removeItem("usuario")
        comprobar()
    },1800000)

}

export function updateLocalStorage(nombre,correo,rol)
{
const usuario={
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