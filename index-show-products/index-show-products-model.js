import { joinProductsWidthTags } from "../utils/utils.js";

/**
 * Hace un fecth a products con los valores informados
 */
export async function getProducts(
  formName,
  formMin,
  formMax,
  tagSearch,
  limit,
  page
) {
  try {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    //conexion con la api para obtener productos
    let url = `http://localhost:8000/api/products?_sort=updatedAt&_order=desc&_page=${page}&_limit=${limit}&`;

    if (formName) url += `name_like=${formName}&`; //Busca nombres similares NO EXACTOS quitando el like buscaría exactos
    if (formMax) url += `price_lte=${formMax}&`;
    if (formMin) url += `price_gte=${formMin}&`;
    if (tagSearch) url += `tagsList_like=%${tagSearch}%&`;

    // Eliminar el último "&" si existe
    if (
      url != `http://localhost:8000/api/products?_page=${page}&_limit=${limit}&`
    ) {
      url = url.endsWith("&") ? url.slice(0, -1) : url;
    }

    const productsResponse = await fetch(url);

    if (!productsResponse.ok) {
      throw new Error("El recurso no existe o está inaccesible");
    }
    const totalCount = Number(productsResponse.headers.get("X-Total-Count"));
    const end = isFinalPage(totalCount, limit, page);

    const products = await productsResponse.json();

    const productsGet = await joinProductsWidthTags(products);
    return { productsGet, end };
  } catch (error) {
    throw new Error(
      "El servidor no responde, por favor vuelva a intentarlo más tarde"
    );
  }
}

/**
 * Obtiene una lista de tags LIMITADO A 150 para en caso de muchos tags no pedirlos todos
 * esto p uede ocasionar problemas con los valores del filtro de productos
 */
export async function getTagsList() {
  try {
    const response = await fetch("http://localhost:8000/api/tags?_limit=150");

    if (!response.ok) {
      throw new Error("Error al buscar los tags");
    }
    
    const tagList = await response.json();

    return tagList;
  } catch (error) {
    throw new Error("Error al buscar los tags");
  }
}

/**
 * Calcula si la página actual es la última
 * devuelve un bool
 */
function isFinalPage(totalCount, limit, page) {
  try {
    const totalPages = totalCount / limit;
    if (page >= totalPages) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("No se puede obtener la última página");
  }
}
