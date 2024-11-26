//cuando el dom este cargado completamente empiezo a hacer cosas
import { loginController } from "./auth/auth-controller.js";
import { loadingSpinner } from "./loading-spinner/spinner-controller.js";
import { sessionController } from "./session/session-controller.js";
import { isUserLoggedIn } from "./utils/utils.js";
import { notificationController } from "./notification/notification-controller.js";

if (isUserLoggedIn()){
    window.location.href="/"
}

document.addEventListener("DOMContentLoaded", () => {
    //Definimos el notificationContainer será donde mostraremos las notificaciones 
    const notificationContainer = document.querySelector(".notification")
    console.log(notificationContainer)
    //importamos la funcion showNotification
    const {showNotification:showBigNotification} = notificationController(notificationContainer)
    
    const loginContainer = document.querySelector(".auth"); // El contenedor de la autenticación
    loginController(loginContainer); // Pasamos el contenedor a la función

    const emailContainer = loginContainer.querySelector("#notificationMail")
    const passContainer = loginContainer.querySelector("#notificationPass")

    const {showNotification:showEmailNotification} = notificationController(emailContainer)
    const {showNotification:showPassotification} = notificationController(passContainer)

    //creo el sessionContainer 
    const sessionContainer = document.querySelector(".navbar")

    //llamo al sessionController para definir como se mostrará la navbar
    sessionController(sessionContainer)

    loginContainer.addEventListener("loading-spinner", (event) => {
        // Alterna el spinner dentro del loginContainer
        loadingSpinner(loginContainer);
    });

    //escucho los eventos "notification" del productContainer        
    loginContainer.addEventListener("notification",async (event)=>{

    //si tengo una notificacion llamo a showBigNotificatio para mostrarla pasandole los  datos que me interesan
    showBigNotification(event.detail.message,event.detail.format,event.detail.type)
    })

    //escucho los eventos "emailNotification" del loginContainer        
    loginContainer.addEventListener("emailNotification",async (event)=>{

        //si tengo una notificacion llamo a showEmailNotification para mostrarla pasandole los  datos que me interesan
        showEmailNotification(event.detail.message,event.detail.format,event.detail.type)
            })

     //escucho los eventos "notification" del loginContainer        
     loginContainer.addEventListener("passNotification",async (event)=>{

        //si tengo una notificacion llamo a showPassotification para mostrarla pasandole los  datos que me interesan
        showPassotification(event.detail.message,event.detail.format,event.detail.type)
            })




});
