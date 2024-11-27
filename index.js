import { filterDrawController, filterProductsController, showProducts } from "./index-show-products/index-show-products-controller.js"
import { loadingSpinner } from "./loading-spinner/spinner-controller.js"
import { notificationController } from "./notification/notification-controller.js";
import { sessionController } from "./session/session-controller.js";

document.addEventListener("DOMContentLoaded", () => { //Esperamos a que el DOM esté cargado   
    
        const notificationContainer = document.querySelector(".notification")        
        const {showNotification} = notificationController(notificationContainer)//importamos la funcion showNotification
        
        //creo el sessionContainer 
        const sessionContainer = document.querySelector(".navbar")
        //llamo al sessionController para definir como se mostrará la navbar
        sessionController(sessionContainer)

         const productContainer = document.querySelector(".products"); //Definimos el productContainer será donde mostraremos los productos
         showProducts(productContainer);// Llama a showProducts para mostrar los productos

        const filterContainer = document.querySelector(".filter-content")
        filterDrawController(filterContainer)        
        
        //escucho los eventos "notification" del productContainer        
        productContainer.addEventListener("notification",async (event)=>{
            //si tengo una notificacion llamo a showNotification para mostrarla pasandole los  datos que me interesan
           showNotification(event.detail.message,event.detail.format,event.detail.type)
        })

        // Escuchamos el evento "loading-spinner"
        productContainer.addEventListener("loading-spinner", (event) => {
        // Alterna el spinner dentro del productContainer
        loadingSpinner(productContainer);
        });

        filterContainer.addEventListener("submit",async (event)=>{
            event.preventDefault();
            const products = await filterProductsController(filterContainer)
            showProducts(productContainer,products);
        })

        filterContainer.addEventListener("notification",async (event)=>{
           showNotification(event.detail.message,event.detail.format,event.detail.type)
        })



        
        

       



  




    
});
