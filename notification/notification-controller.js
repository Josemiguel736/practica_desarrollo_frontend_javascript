import { buildNotification } from "./notification-views.js"

export const notificationController= (notificationContainer)=>{

    //defino la funcion showNotification
    /*
    notification: texto de la notificación
    format: formato de la notificación "big":Se mostrára en formato grande, con un background || "little": pensada para mostrarla dentro de formularios o similar, más pequeña 
            las notificaciones "little" NO DESAPARECEN de forma predeterminada
    type: Por defecto en "success" acepta "success": Casos de éxito, "error": Casos de error, en formato "big" cambia la duración que tienen antes de desaparecer
    */
    const showNotification = (notification,format,type="success")=>{
        //Creo el HTML de la notificación
        notificationContainer.innerHTML = buildNotification(notification,format,type)
        
        //si el formato es "big" eliminaremos la notificación pasado un tiempo
        if (format==="big"){
            //Duracion del setTimeout por defecto a 4 segundos
            let duration = 4000
        if(type!=="success"){
            //si su type no es "success" duration seráde 10 segundos
            duration=10000            
        }
        setTimeout(()=>{            
        //pasado el tiempo ocultaremos la notificación
        notificationContainer.classList.toggle("hidden")
        },duration)
    }}
    return {
        //retornamos la función showNotification
        showNotification
    }
}