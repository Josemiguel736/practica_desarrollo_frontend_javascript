import { registerUser } from "./auth/auth-controller.js";
import { loadingSpinner } from "./loading-spinner/spinner-controller.js";
import { sessionController } from "./session/session-controller.js";
import { isUserLoggedIn } from "./utils/utils.js";

if (isUserLoggedIn()){
    window.location.href="/"
}
document.addEventListener("DOMContentLoaded", () => {
    const registerContainer = document.querySelector(".auth"); // El contenedor de la autenticación
    registerUser(registerContainer); // Pasamos el contenedor a la función

    //creo el sessionContainer 
    const sessionContainer = document.querySelector(".navbar")

    //llamo al sessionController para definir como se mostrará la navbar
    sessionController(sessionContainer)

    registerContainer.addEventListener("loading-spinner", (event) => {
        // Alterna el spinner dentro del productContainer
        loadingSpinner(registerContainer);
    });
});
