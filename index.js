import { showProducts } from "./index-show-products/index-show-products-controller.js"
import { loadingSpinner } from "./loading-spinner/spinner-controller.js"
import { notificationController } from "./notification/notification-controller.js";
import { sessionController } from "./session/session-controller.js";


//Esperamos a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {

    //Definimos el productContainer será donde mostraremos los productos
    const productContainer = document.querySelector(".products");

    //Definimos el notificationContainer será donde mostraremos las notificaciones 
    const notificationContainer = document.querySelector(".notification")

    //importamos la funcion showNotification
    const {showNotification} = notificationController(notificationContainer)

    // Escuchamos el evento "loading-spinner"
    productContainer.addEventListener("loading-spinner", (event) => {

        // Alterna el spinner dentro del productContainer
        loadingSpinner(productContainer);
        });

        // Llama a showProducts para mostrar los productos
        showProducts(productContainer);

        //creo el sessionContainer 
        const sessionContainer = document.querySelector(".navbar")

        //llamo al sessionController para definir como se mostrará la navbar
        sessionController(sessionContainer)

        //escucho los eventos "notification" del productContainer        
        productContainer.addEventListener("notification",async (event)=>{

            //si tengo una notificacion llamo a showNotification para mostrarla pasandole los  datos que me interesan
           await showNotification(event.detail.message,event.detail.format,event.detail.type)
        })

  




    
});
