import {
  filterDrawController,
  filterProductsController,
  paginationProductsController,
  showProducts,
} from "./index-show-products/index-show-products-controller.js";
import { loadingSpinner } from "./loading-spinner/spinner-controller.js";
import { notificationController } from "./notification/notification-controller.js";
import { sessionController } from "./session/session-controller.js";

document.addEventListener("DOMContentLoaded", () => {
  //Esperamos a que el DOM esté cargado

  const notificationContainer = document.querySelector(".notification");
  const { showNotification } = notificationController(notificationContainer); //importamos la funcion showNotification

  //creo el sessionContainer
  const sessionContainer = document.querySelector(".navbar");
  //llamo al sessionController para definir como se mostrará la navbar
  sessionController(sessionContainer);

  //Iniciamos los botones de pagnación
  const paginationContainer = document.querySelector(".paginationButtons");
  paginationProductsController(paginationContainer);


  const productContainer = document.querySelector(".products"); //Definimos el productContainer será donde mostraremos los productos

  // Escuchamos el evento "loading-spinner"
  productContainer.addEventListener("loading-spinner", (event) => {
    // Alterna el spinner dentro del productContainer
    loadingSpinner(productContainer);
  });

  //Pintamos el filtro de productos
  const filterContainer = document.querySelector(".filter-content");
  filterDrawController(filterContainer);

  showProducts(productContainer); // Llama a showProducts para mostrar los productos

  //escucho los eventos "notification" del productContainer
  productContainer.addEventListener("notification", async (event) => {
    //si tengo una notificacion llamo a showNotification para mostrarla pasandole los  datos que me interesan
    showNotification(
      event.detail.message,
      event.detail.format,
      event.detail.type
    );
  });

  //filtramos los productos
  filterContainer.addEventListener("submit", async (event) => {
    event.preventDefault();
    const products = await filterProductsController(filterContainer);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", 1);
    history.pushState(null, "", `?${searchParams.toString()}`);
    paginationProductsController(paginationContainer);
    await showProducts(productContainer, products);
  });

  filterContainer.addEventListener("notification", async (event) => {
    showNotification(
      event.detail.message,
      event.detail.format,
      event.detail.type
    );
  });

  paginationContainer.addEventListener("click", async (event) => {
    // Verificar si el clic fue en un botón de siguiente o atrás
    if (
      event.target.classList.contains("prev-page") ||
      event.target.classList.contains("next-page")
    ) {
      event.preventDefault();

      const searchParams = new URLSearchParams(window.location.search);
      let currentPage = parseInt(searchParams.get("page")) || 1;

      if (event.target.classList.contains("prev-page")) {
        currentPage -= 1;
      } else if (event.target.classList.contains("next-page")) {
        currentPage += 1;
      }

      searchParams.set("page", currentPage);

      history.pushState(null, "", `?${searchParams.toString()}`);

      const products = await filterProductsController(
        filterContainer,
        currentPage
      );

      paginationProductsController(paginationContainer);
      await showProducts(productContainer, products);
    }
  });
});
