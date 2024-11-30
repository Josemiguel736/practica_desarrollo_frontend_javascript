import { buildNotification } from "./notification-views.js";

/**
 * Controla la lógica para pintar notificaciones
 */
export const notificationController = (notificationContainer) => {
  let isNotificationActive = false; // Indica si hay una notificación en curso
  const notificationQueue = []; // Cola de notificaciones pendientes

  const processQueue = async () => {
    if (isNotificationActive || notificationQueue.length === 0) {
      return; // No hacer nada si ya hay una notificación activa o no hay notificaciones en la cola
    }

    isNotificationActive = true;
    const { notification, format, type } = notificationQueue.shift(); // Saca la primera notificación de la cola

    // Muestro la notificación actual
    notificationContainer.innerHTML = buildNotification(
      notification,
      format,
      type
    ); //Construye la notificacion
    notificationContainer.classList.toggle("hidden"); // Muestra la notificación

    if (format === "big") {
      let duration = 4000;
      if (type !== "success") {
        duration = 10000; // Cambia la duración si el tipo no es "success"
      }
      // Espera el tiempo configurado
      await new Promise((resolve) => setTimeout(resolve, duration));
    }

    // Oculta la notificación al finalizar
    notificationContainer.classList.toggle("hidden");

    // Cambia el estado sobre si hay una notificación activa
    isNotificationActive = false;

    //Espero 70 milisegundos para mostrar la siguiente notificación
    await new Promise((resolve) => setTimeout(resolve, 700));

    processQueue(); // Procesa la siguiente notificación en la cola
  };

  /**
 * Recibe una notificación y la añade a la cola de notificaciones
 */
  const showNotification = async (notification, format, type = "success") => {
    // Agrego la nueva notificación a la cola
    notificationQueue.push({ notification, format, type });
    processQueue(); // Inicio el procesamiento si no está ya en curso
  };

  return {
    showNotification,
  };
};
