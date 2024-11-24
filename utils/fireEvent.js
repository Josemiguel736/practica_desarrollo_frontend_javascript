//Recibe el nombre del evento, un mensaje, el tipo, debería de ser success o error y el contenedor donde vamos a disparar el evento
export function fireEvent(eventName,message,type,element){
    const customEvent = new CustomEvent(`${eventName}`,
       {detail:{message,
          type
       }})
       element.dispatchEvent(customEvent)
 }