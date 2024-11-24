import { drawSpinner } from "./spinner.views.js"


export const loadingSpinner = (container) =>{
    let spinner = container.querySelector(".loading-spinner");

    // Si no existe, lo creamos
    if (!spinner) {
        spinner = document.createElement("div");
        spinner.className = "product loading-spinner";
        spinner.innerHTML = drawSpinner;
        container.appendChild(spinner);
        console.log("Spinner creado dinámicamente.");
    }
    spinner.classList.toggle("hidden")
}