import {
  buildFilter,
  buildNoProducts,
  buildProduct,
  drawPaginationButtons,
  hiddenNextButton,
} from "./index-show-products-views.js";
import { getProducts, getTagsList } from "./index-show-products-model.js";
import { fireEvent } from "../utils/fireEvent.js";
import {
  getPage,
  openAndFireNotification,
  writeNotification,
  getTag,
} from "../utils/utils.js";

/**
 * Pinta o productos o un cartel de no hay productos
 */
function drawProducts(products, productContainer) {
  productContainer.classList.remove("loading");
  if (products.length === 0) {
    const noProduct = buildNoProducts();
    productContainer.appendChild(noProduct);
  } else {
    //si los hay llama en un bucle a buildProduct pasandole un objeto producto

    products.forEach((product) => {
      const newProduct = buildProduct(product);
      productContainer.appendChild(newProduct);
    });
  }
}

/**
 * Maneja la lógica para obtener productos y pintarlos
 * controla los estados de carga y error
 */
export async function showProducts(productContainer, products) {
  //Iniciamos la ruleta de carga
  
  try {
    fireEvent("loading-spinner", productContainer);
    const page = getPage();
    //Comprobamos si hemos recibido ya los productos o no, en caso negativo los buscamos
    let productsAndEnd;
    if (products) {
      productsAndEnd = products;
    } else {
      productsAndEnd = await getProducts(null, null, null, null, null, page);
    }
    const { productsGet, end, finalPage } = productsAndEnd;

    //vaciamos products container
    productContainer.innerHTML = "";
    isTheLastPage(end, finalPage);
    hiddenNextButton(end);
    drawProducts(productsGet, productContainer);
    openAndFireNotification(productContainer);

    if (page === "1") {
      //Lanzamos una notificación indicando que los productos se cargaron correctamente
      fireEvent(
        "notification",
        productContainer,
        "Productos cargados correctamente",
        "big",
        "success"
      );
    }
  } catch (error) {
    //Si ha ocurrido un error lanzaremos una notificación al usuario
    fireEvent("notification", productContainer, error, "big", "error");
  }
}

/**
 * Maneja la lógica para pintar el filtro de busqueda
 */
export async function filterDrawController(filterContainer) {
  try {
    const tagsObjets = await getTagsList(); //lista de todos los tags ALERT: puede crear problemas buscar todos los tags así

    const tagList = [];
    tagsObjets.forEach((tag) => {
      tagList.push(tag.tag);
    });
    const filter = buildFilter(tagList);

    filterContainer.appendChild(filter);
  } catch (error) {
    writeNotification(
      "notification",
      "Error al crear el filtro de búsqueda",
      "big",
      "error"
    );
  }
}

/**
 * Maneja la lógica para filtrar
 */
export async function filterProductsController(filterContainer, page) {
  const nameElement = filterContainer.querySelector("#name");
  const minElement = filterContainer.querySelector("#min");
  const maxElement = filterContainer.querySelector("#max");
  const tagElement = filterContainer.querySelector("#tag");
  const limitElement = filterContainer.querySelector("#limit");

  const formName = nameElement.value;
  const formMin = minElement.value;
  const formMax = maxElement.value;
  const formTag = tagElement.value;
  const formLimit = limitElement.value;

  let tagSearch = undefined;
  if (formTag != "Todos") {
    tagSearch = await getTag(formTag);
    tagSearch = tagSearch[0].id;
  }

  // Llamamos a getFilteredProducts pasando los parámetros que hemos recogido del formulario
  try {
    const filterProducts = await getProducts(
      formName,
      formMin,
      formMax,
      tagSearch,
      formLimit,
      page
    );
    return filterProducts;
  } catch (error) {
    fireEvent("notification", filterContainer, `${error}`, "big", "error");
  }
}

/**
 * Maneja la lógica para pintar los botones de paginacion
 */
export function paginationProductsController(paginationContainer) {
  paginationContainer.innerHTML = "";
  const page = getPage();
  paginationContainer.appendChild(drawPaginationButtons(page));
}

/**
 * Si el usuario cambia de tag en el filtro pero no le da a submit
 * evita que filtre y vaya a una página vacia
 */
function isTheLastPage(end, finalPage) {
  if (end) {
    const page = getPage();
    finalPage +=1
    if (page > finalPage && page!=1) {
      let endPage = page - 1;
      while (endPage > finalPage) {
        endPage -= 1;
      }
      if (endPage <= finalPage) {
        const currentUrl = new URL(window.location.href);
        const searchParams = new URLSearchParams(currentUrl.search);
        searchParams.set("page", `${endPage}`);
        currentUrl.search = searchParams.toString();
        window.location.href = currentUrl.toString();
      }
    }
  }
}
