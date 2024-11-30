/**
 * Recibe el nombre del evento, un mensaje, el tipo, debería de ser success o error y el contenedor donde vamos a disparar el evento
 */
export function fireEvent(eventName, element, message, format, type) {
  const customEvent = new CustomEvent(`${eventName}`, {
    detail: { message, format, type },
  });
  element.dispatchEvent(customEvent);
}
