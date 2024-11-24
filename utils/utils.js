export const mailRegExp = "[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}"

export const isUserLoggedIn = ()=>{
    //busco en el local Storage el json web token
    const token = localStorage.getItem("jwt")
    
    //transformacion a booleano y retorno un boolean
    return !!token;
}