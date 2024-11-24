import { createUser } from "./auth-model.js"
import { notificationController } from "../notification/notification-controller.js"
import { fireEvent } from "../utils/fireEvent.js"
import { mailRegExp } from "../utils/utils.js"
import { loginUser } from "./auth-model.js"


export function registerUser(registerContainer){
    registerContainer.addEventListener("submit",(event)=>{
        event.preventDefault()
        const userEmailElement = registerContainer.querySelector("#mail")
        const passwordElement = registerContainer.querySelector("#password")
        const passwordConfirmElement = registerContainer.querySelector("#password-confirm")

        const userEmail=userEmailElement.value
        const password = passwordElement.value
        const passwordConfirm = passwordConfirmElement.value
        
        const emailContainer = document.querySelector("#notificationMail")
        const passContainer = document.querySelector("#notificationPass")
        emailContainer.innerHTML=""
        passContainer.innerHTML=""

        //buscamos errores
        //si los hay, añadimos errores a la lista de errores            
        const emailRegExp = new RegExp(mailRegExp)
        const errors=[]
        if(!emailRegExp.test(userEmail)){
            errors.push(["el email no es valido",emailContainer])}
        if (password != passwordConfirm){            
            errors.push(["las password no son iguales",passContainer])            
        }
        for (const error of errors){
            //mostrar notificaciones de error            
           const {showNotification} = notificationController(error[1])
           showNotification(error[0],"little", "error")
        }
        if (errors.length===0){
            //consumimos sparrest para crear el usuario
            handleCreateUser(userEmail,password,registerContainer)
        }
    })
} 

const handleCreateUser = async (userEmail,password,registerContainer)=>{
    fireEvent("loading-spinner",registerContainer)
    try {
        await createUser(userEmail,password)
        const token = await loginUser(userEmail,password)
        localStorage.setItem("jwt",token)

       //redireccion al index
       window.location.href="/"
    } catch (error) {
        if (error.message==="Failed to fetch"){
            const notificationContainer= document.querySelector(".notification")
            const {showNotification} = notificationController(notificationContainer)
            showNotification("Estamos teniendo problemas con el servidor, por favor vuelva a intentarlo más tarde","big", "error")     
            
        }else{
            const emailContainer = document.querySelector("#notificationMail")
        const {showNotification} = notificationController(emailContainer)
        showNotification(error.message,"little", "error") }      
    }finally{
        fireEvent("loading-spinner",registerContainer)
    }
}


export function loginController(loginContainer){
    loginContainer.addEventListener("submit",(event)=>{
        event.preventDefault()
        const userEmailElement = loginContainer.querySelector("#mail")
        const passwordElement = loginContainer.querySelector("#password")

        const userEmail=userEmailElement.value
        const password = passwordElement.value
        
        const emailContainer = document.querySelector("#notificationMail")
        const passContainer = document.querySelector("#notificationPass")

        emailContainer.innerHTML=""
        passContainer.innerHTML=""

        const emailRegExp = new RegExp(mailRegExp)
        if(!emailRegExp.test(userEmail)){  
           const {showNotification} = notificationController(emailContainer)
           showNotification("Email no valido","little", "error")
        }else{
            handleLogin(userEmail,password,loginContainer)
        }
})}

const handleLogin = async (userEmail,password,loginContainer)=>{

    try {
        fireEvent("loading-spinner",loginContainer)

        //llamo al modelo del login 
        const token = await loginUser(userEmail,password)
        localStorage.setItem("jwt",token)

       //redireccion al index
       window.location.href="/"
    } catch (error) {
        if (error.message==="Failed to fetch"){
            const notificationContainer= document.querySelector(".notification")
            const {showNotification} = notificationController(notificationContainer)
            showNotification("Estamos teniendo problemas con el servidor, por favor vuelva a intentarlo más tarde","big", "error")     
            
        }else{
            const emailContainer = document.querySelector("#notificationMail")
        const {showNotification} = notificationController(emailContainer)
        showNotification(error.message,"little", "error") }
    }finally{
        fireEvent("loading-spinner",loginContainer)
    }
}
