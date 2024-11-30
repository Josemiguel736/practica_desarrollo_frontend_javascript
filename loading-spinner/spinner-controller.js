import { drawSpinner } from "./spinner.views.js";


/**
 * Controla la lógica para pintar la ruleta de carga
 */
export const loadingSpinner = (container) => {
  try {
    //busca el nodo donde cargar el spinner
    let spinner = container.querySelector(".loading-spinner");

    // Si no existe, lo creamos
    if (!spinner) {
      spinner = document.createElement("div");
      spinner.className = "product loading-spinner hidden";
      spinner.innerHTML = drawSpinner;
      //si lo tiene que crear lo hará como el primer hijo del nodo padre
      container.prepend(spinner);
    }
    //si ya existe y tiene la propiedad "hidden" se la quitaremos y viceversa
    spinner.classList.toggle("hidden");
  } catch (error) {
    throw new Error("No se puede cargar el spinner");
  }
};
