import { createUser } from "./auth-model.js"
import { fireEvent } from "../utils/fireEvent.js"
import { mailRegExp, writeNotification } from "../utils/utils.js"
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

        //buscamos errores
        //si los hay, añadimos errores a la lista de errores            
        const emailRegExp = new RegExp(mailRegExp)
        const errors=[]
        if(!emailRegExp.test(userEmail)){
            errors.push(["el email no es valido","emailNotification"])
        }else{
            fireEvent("emailNotification",registerContainer,"","little","error")
        }
        if (password != passwordConfirm){            
            errors.push(["las password no son iguales","passNotification"])            
        }else{
            fireEvent("passNotification",registerContainer,"","little","error")
        }
        for (const error of errors){
            //enviar notificaciones de error            
           fireEvent(error[1],registerContainer,error[0],"little","error")
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
        writeNotification("notification","Usuario creado correctamente","big","success")

       //redireccion al index
       window.location.href="/"
    } catch (error) {
        if (error.message==="Failed to fetch"){
            fireEvent("notification",registerContainer,"El servidor no está disponible en este momento, por favor intentelo más tarde","big","error")   
            
        }else if(error.message==="400"){            
            fireEvent("emailNotification",registerContainer,"El email ya existe","little","error")
        }
        else{
            fireEvent("notification",registerContainer,(error),"big","error")   
        }
    }finally{
        fireEvent("loading-spinner",registerContainer)
    }
}

export function loginController(loginContainer){

    try {
        loginContainer.addEventListener("submit",(event)=>{
            event.preventDefault()
            const userEmailElement = loginContainer.querySelector("#mail")
            const passwordElement = loginContainer.querySelector("#password")
    
            const userEmail=userEmailElement.value
            const password = passwordElement.value
          
            const emailRegExp = new RegExp(mailRegExp)
            if(!emailRegExp.test(userEmail)){  
                fireEvent("emailNotification",loginContainer,"El e-mail no es correcto","little","error")
            }else{
                handleLogin(userEmail,password,loginContainer)
            }
    })
        
    } catch (error) {
     fireEvent("notification",loginContainer,"El servidor no está disponible en este momento, por favor intentelo más tarde","big","error")         
    }}
    

const handleLogin = async (userEmail,password,loginContainer)=>{

    try {
        fireEvent("loading-spinner",loginContainer)

        //llamo al modelo del login 
        const token = await loginUser(userEmail,password)
        writeNotification("notification","Sesión iniciada correctamente","big","success")

        //guardo su token
        localStorage.setItem("jwt",token)

       //redireccion al index
       window.location.href="/"
    } catch (error) {
        
        if(error.message==="401"){
            fireEvent("emailNotification",loginContainer,"Email o contraseña incorrectos","little","error")
        }
        else{
            
            fireEvent("notification",loginContainer,"El servidor no está disponible en este momento, por favor intentelo más tarde","big","error")   
        }
    }finally{

        fireEvent("loading-spinner",loginContainer)
    }
}
