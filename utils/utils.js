import { fireEvent } from "./fireEvent.js";

export const mailRegExp =
  "[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}";

export const imageDefault = "../assets/product-photos/no_image.jpg"

  /**
 * Comprueba si el usuario esta logueado, devuelve un bool
 */
export const isUserLoggedIn = () => {
  //busco en el local Storage el json web token
  const token = localStorage.getItem("jwt");
  //transformacion a booleano y retorno un boolean
  return !!token;
};

/**
 * Escribe en el localStorage un item llamado notificación
 */
export const writeNotification = (eventName, messagge, format, type) => {
  const notification = { eventName, messagge, format, type };
  localStorage.setItem("notification", JSON.stringify(notification));
};

/**
 * Busca en el localStorage un item llamado notificación si existe lanza una notificacion del tipo que se le indica
 */
export const openAndFireNotification = (container) => { 
  const notification = JSON.parse(localStorage.getItem("notification"));
  if (notification) {
    fireEvent(
      notification.eventName,
      container,
      notification.messagge,
      notification.format,
      notification.type
    );
    // Limpia la notificación para evitar que se muestre nuevamente
    localStorage.removeItem("notification");
  }
};

/**
 * Escribe en el localStorage un objeto llamado objet
 */
export const sendObjet = (item) => {
  const objet = { item };
  localStorage.setItem("objet", JSON.stringify(objet));
};

/**
 * Busca en el localStorage un item llamado objet devuelve un objeto
 */
export const openObjet = () => {
  const objet = JSON.parse(localStorage.getItem("objet"));
  if (objet) {
    return objet;
  }
};

/**
 * Une los productos con sus tags
 * retorna un array de productos con tags 
 */
export async function joinProductsWidthTags(products) {
  const productsWithTags = await Promise.all(
    products.map(async (product) => {
      const resolvedTags = await Promise.all(
        product.tagsList.map(async (tagId) => {
          // Limpia el tagId
          const cleanTag = Number(tagId.split("%").join(""));
          // Busca el tag correspondiente
          const tag = await getTagId(cleanTag);
          // Retorna el tag correcto
          
          return tag;
        })
      );

      // Devuelve el producto con los tags resueltos
      return {
        ...product,
        tags: resolvedTags,
      };
    })
  );


  return productsWithTags;
}




/**
 * Comprueba la página actual mediante search params
 * si no hay search params detectara la página actual como la 1
 */
export function getPage() {
  const searchParams = new URLSearchParams(window.location.search);
  let page = searchParams.get("page");
  if (page === null) {
    page = "1";
  }
  return page;
}

/**
 * Hace una petición a la API para obtener un tag
 * retorna un tag
 */
export async function getTag(tagToLocate) {
  const response = await fetch(
    `http://localhost:8000/api/tags?tag=${tagToLocate}`
  );

  if (!response.ok) {
    throw new Error("Error al buscar el tag");
  }
  // Obtengo los datos de la respuesta
  const tagFind = await response.json();

  return tagFind;
}

export async function getTagId(tagToLocate) {
  const response = await fetch(
    `http://localhost:8000/api/tags?id=${tagToLocate}`
  );
 

  if (!response.ok) {
    throw new Error("Error al buscar el tag");
  }
  // Obtengo los datos de la respuesta
  const tagFind = await response.json();
  return tagFind[0].tag;
}


/**
 * Pasa a mayúscula la primera letra de la palabra
 * retorna una palabra con la primera letra en mayuscula
 */
export function capitalize(word){  

const firstLetter = word.charAt(0)

const firstLetterUpper = firstLetter.toUpperCase()

const lastLetters = word.slice(1)

const capitalizedWord = firstLetterUpper + lastLetters
return capitalizedWord
}