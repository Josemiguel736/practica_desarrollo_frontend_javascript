//cuando el dom este cargado completamente empiezo a hacer cosas
import { loginController } from "./auth/auth-controller.js";
import { loadingSpinner } from "./loading-spinner/spinner-controller.js";
import { sessionController } from "./session/session-controller.js";
import { isUserLoggedIn } from "./utils/utils.js";

if (isUserLoggedIn()){
    window.location.href="/"
}

document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.querySelector(".auth"); // El contenedor de la autenticación
    loginController(loginContainer); // Pasamos el contenedor a la función

    //creo el sessionContainer 
    const sessionContainer = document.querySelector(".navbar")

    //llamo al sessionController para definir como se mostrará la navbar
    sessionController(sessionContainer)

    loginContainer.addEventListener("loading-spinner", (event) => {
        // Alterna el spinner dentro del productContainer
        loadingSpinner(loginContainer);
    });
});
