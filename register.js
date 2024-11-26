import { registerUser } from "./auth/auth-controller.js";
import { loadingSpinner } from "./loading-spinner/spinner-controller.js";
import { sessionController } from "./session/session-controller.js";
import { isUserLoggedIn } from "./utils/utils.js";
import { notificationController } from "./notification/notification-controller.js";

if (isUserLoggedIn()){
    window.location.href="/"
}
document.addEventListener("DOMContentLoaded", () => {
    //Definimos el notificationContainer será donde mostraremos las notificaciones principales 
    const notificationContainer = document.querySelector(".notification")    
    //importamos la funcion showNotification como showBigNotification y se encargará de las notificaciones principales
    const {showNotification:showBigNotification} = notificationController(notificationContainer)

    
    const registerContainer = document.querySelector(".auth"); // El contenedor de la autenticación
    registerUser(registerContainer); // Pasamos el contenedor a la función

    const emailContainer = registerContainer.querySelector("#notificationMail")
    const passContainer = registerContainer.querySelector("#notificationPass")

    const {showNotification:showEmailNotification} = notificationController(emailContainer)
    const {showNotification:showPassotification} = notificationController(passContainer)
    
    //creo el sessionContainer 
    const sessionContainer = document.querySelector(".navbar")

    //llamo al sessionController para definir como se mostrará la navbar
    sessionController(sessionContainer)

    registerContainer.addEventListener("loading-spinner", (event) => {
        // Alterna el spinner dentro del productContainer
        loadingSpinner(registerContainer);
    });
    

    //escucho los eventos "notification" del productContainer        
    registerContainer.addEventListener("notification",async (event)=>{
    //si tengo una notificacion llamo a showNotification para mostrarla pasandole los  datos que me interesan
        showBigNotification(event.detail.message,event.detail.format,event.detail.type)
        })

     //escucho los eventos "notification" del productContainer        
     registerContainer.addEventListener("emailNotification",async (event)=>{

        //si tengo una notificacion llamo a showNotification para mostrarla pasandole los  datos que me interesan
        showEmailNotification(event.detail.message,event.detail.format,event.detail.type)
            })

     //escucho los eventos "notification" del productContainer        
     registerContainer.addEventListener("passNotification",async (event)=>{

        //si tengo una notificacion llamo a showNotification para mostrarla pasandole los  datos que me interesan
        showPassotification(event.detail.message,event.detail.format,event.detail.type)
            })
});
