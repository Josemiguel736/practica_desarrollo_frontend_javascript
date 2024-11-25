import { buildAuthorizedSession,buildUnauthorizedSession } from "./session-views.js"
import { isUserLoggedIn } from "../utils/utils.js"
export function sessionController(sessionContainer){

    if(isUserLoggedIn()){
        //mostrar un boton crear producto y otro para borrar el token de sesión
        sessionContainer.innerHTML = buildAuthorizedSession()

        //gestion boton borrar token
        //busco el boton de cerrar sesion
        const closeSessioButton = sessionContainer.querySelector("button")

        //escucho el evento click dentro del button
        closeSessioButton.addEventListener("click",()=>{
            //borro el token
            localStorage.removeItem("jwt")
            //vuelvo a llamar al controlador para solo recargar la parte afectada por este nodo
            sessionController(sessionContainer)
            const path=window.location.pathname
            
            if(path!=="/"){
                const locationUser=window.location.href
                window.location.href=locationUser
            }
        })
    }else{
        //mostrar enlaces al login y singup
        sessionContainer.innerHTML = buildUnauthorizedSession()

    }
}