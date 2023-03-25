//co n esta función simplemente comprobamos que existe el token en localstorage y apartecada 30 minutos(1800000 ms) borramos el token y vuelve a llamar a la función de comprobación de token


export function comprobar()
{
    if(localStorage.getItem('token')===null)
    {
        window.location.href = 'login.html';

    }

    setTimeout(function(){

        //borramos el token del localStorage
        localStorage.removeItem("token")
        comprobar()
    },1800000)

}