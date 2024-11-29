import { createProductController } from "./create-product/create-product-controller.js";
import { isUserLoggedIn } from "./utils/utils.js";
import { loadingSpinner } from "./loading-spinner/spinner-controller.js";
import { notificationController } from "./notification/notification-controller.js";
import { sessionController } from "./session/session-controller.js";

if (!isUserLoggedIn()) {
  window.location.href = "/";
}

document.addEventListener("DOMContentLoaded", () => {
  const createProductContainer = document.querySelector(".auth");

  //Definimos el notificationContainer será donde mostraremos las notificaciones
  const notificationContainer = document.querySelector(".notification");

  //importamos la funcion showNotification
  const { showNotification } = notificationController(notificationContainer);

  // Escuchamos el evento "loading-spinner"
  createProductContainer.addEventListener("loading-spinner", (event) => {
    // Alterna el spinner dentro del productContainer
    loadingSpinner(createProductContainer);
  });

  createProductController(createProductContainer);

  //creo el sessionContainer
  const sessionContainer = document.querySelector(".navbar");

  //llamo al sessionController para definir como se mostrará la navbar
  sessionController(sessionContainer);

  //escucho los eventos "notification" del productContainer
  createProductContainer.addEventListener("notification", async (event) => {
    //si tengo una notificacion llamo a showNotification para mostrarla pasandole los  datos que me interesan
    showNotification(
      event.detail.message,
      event.detail.format,
      event.detail.type
    );
  });
});
