import { showProducts } from "./index-show-products/index-show-products-controller.js"
import { loadingSpinner } from "./loading-spinner/spinner-controller.js"

//buscamos en el HTML la clase .products
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.querySelector(".products");

    // Llama a showProducts cuando el DOM esté listo
    showProducts(productContainer);

    // Manejador para el evento personalizado "loading-spinner"
    productContainer.addEventListener("loading-spinner", (event) => {
        // Alterna el spinner dentro del productContainer
        loadingSpinner(productContainer);
    });
});
