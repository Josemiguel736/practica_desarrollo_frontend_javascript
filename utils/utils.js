import { fireEvent } from "./fireEvent.js";

export const mailRegExp = "[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}"

export const isUserLoggedIn = ()=>{
    //busco en el local Storage el json web token
    const token = localStorage.getItem("jwt")
    
    //transformacion a booleano y retorno un boolean
    return !!token;
}

export const writeNotification=(eventName,messagge,format,type)=>{
    const notification = {eventName,messagge,format,type}
    localStorage.setItem("notification", JSON.stringify(notification))
}

export const openAndFireNotification = (element)=>{
    const notification =  JSON.parse(localStorage.getItem("notification"));
    if (notification) {        
    fireEvent(notification.eventName,element, notification.messagge,notification.format,notification.type);
    // Limpia la notificación para evitar que se muestre nuevamente
    localStorage.removeItem("notification");
}
}

export function joinProductsWidthTags(products,tags){
    const productsWidthTags = products.map(product => {
        // Transformo cada producto
        return {
          ...product, // Copio todas las propiedades originales del producto
          tags: product.tagsId.map(tagId => {
            // Busco cada tagId 
            const tag =tags.find(tag=>tag.id ===tagId)
            //retorno el tag correcto
            return tag.tag
          })
        }
      })
      return productsWidthTags

}