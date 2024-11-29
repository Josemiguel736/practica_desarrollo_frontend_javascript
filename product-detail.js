import { loadingSpinner } from "./loading-spinner/spinner-controller.js";
import { notificationController } from "./notification/notification-controller.js";
import { productDetailController } from "./product-detail/product-detail-controller.js";
import { sessionController } from "./session/session-controller.js";

//Esperamos a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  const searchParams = new URLSearchParams(window.location.search);
  const productId = searchParams.get("id");
  const productQueryTags = searchParams.get("tags");

  //Definimos el productDetailContainer será donde mostraremos los productos
  const productDetailContainer = document.querySelector(".container-detail");

  //Definimos el notificationContainer será donde mostraremos las notificaciones
  const notificationContainer = document.querySelector(".notification");

  //importamos la funcion showNotification
  const { showNotification } = notificationController(notificationContainer);

  // Escuchamos el evento "loading-spinner"
  productDetailContainer.addEventListener("loading-spinner", (event) => {
    // Alterna el spinner dentro del productDetailContainer
    loadingSpinner(productDetailContainer);
  });

  // Llama a showProducts para mostrar el producto
  productDetailController(productDetailContainer, productId, productQueryTags);

  //creo el sessionContainer
  const sessionContainer = document.querySelector(".navbar");

  //llamo al sessionController para definir como se mostrará la navbar
  sessionController(sessionContainer);

  //escucho los eventos "notification" del productDetailContainer
  productDetailContainer.addEventListener("notification", (event) => {
    //si tengo una notificacion llamo a showNotification para mostrarla pasandole los  datos que me interesan
    showNotification(
      event.detail.message,
      event.detail.format,
      event.detail.type
    );
  });
});
