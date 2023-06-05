import {comprobar} from "./commons.js";
comprobar();
document.body.style.backgroundImage = "url('imagenes/textura-acero.png')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
//recogemos el formulario
const formulario = document.getElementById('formulario');
let etNumTarjeta = document.getElementById('labNunTar');
let numTarjeta = document.getElementById('numeroTarjeta');
let errNumTarjeta = document.getElementById('numTarErr');
let etNomTarjeta= document.getElementById('labNomTar');
let nomTarjeta = document.getElementById('nombreTarjeta');
let cvc = document.getElementById('cvc');
let errNomTarjeta = document.getElementById('nomTarErr');
let mesTarjeta=document.querySelector("#mes");
let añoTarjeta=document.querySelector("#año");


// variable usuario de storage
var usuario = JSON.parse(localStorage.getItem("Datos_usuario"));
var id_usuario = usuario["Id_usuario"]; 


//vamos a crear los option para los valores de los meses de la fecha de caducidad de la tarejeta(meses y años)
for(let i=1;i<=12;i++)
{
    let option=document.createElement("option");
    option.value=i<10?"0"+i:i;
    option.textContent=i<10?"0"+i:i;
    mesTarjeta.appendChild(option);
}

for(let i=23;i<=32;i++)
{
    let option=document.createElement("option");
    option.value="20"+i;
    option.textContent="20"+i;
    añoTarjeta.appendChild(option);
}


formulario.addEventListener("submit",(event)=>{

    event.preventDefault();
    registraMetodoPago();


})


function registraMetodoPago()
{
    //expresion regular para la tarjeta
    const regextarjeta=/^\d{16}$/
    const regexnombtarjeta=/^[a-zA-Z\s]+$/
    const regexcvc = /^\d{3,4}$/

    //montamos el la fecha de caducidad de la tarjeta para que sea válida para DATE mysql(yyyy-mm-dd)
    let fechaCaducidad=`${añoTarjeta.value}-${mesTarjeta.value-1}-01`;

    //comprobamos la validez de los valores de la tarjeta
    if(!regextarjeta.test(numTarjeta.value))
    {
        document.querySelector("#numTarErr").textContent="El número de tarjeta no es válido";
    }
    if(!regexnombtarjeta.test(nomTarjeta.value))
    {
        document.querySelector("#nomTarErr").textContent="El nombre de la tarjeta no es válido";

    }
    if(!regexcvc.test(cvc.value))
    {
        document.querySelector("#cvcError").textContent="El CVC no es válido";

    }
 
    //si ambos son válidos montamos el cuerpo del fetch
    if(regextarjeta.test(numTarjeta.value)&&regexnombtarjeta.test(nomTarjeta.value)&&regexcvc.test(cvc.value))
    {
        //montamos el cuerpo del post
        const pago={
            'usuario': id_usuario,
            'numero_tarjeta':numTarjeta.value,
            'nombre_tarjeta':nomTarjeta.value,
            'fecha_caducidad':fechaCaducidad,
            'cvc':cvc.value
        }

        let options={
            method: "POST",
            headers:{'Content-type':'aplication/json'},
            body:JSON.stringify(pago)
                }

        fetch("http://localhost/Proyecto/parking/metodo_pago.php",options)
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            window.location.href = 'inicio.php';    
        })        
    }




}