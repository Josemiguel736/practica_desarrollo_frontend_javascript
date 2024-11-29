import {
  buildFilter,
  buildNoProducts,
  buildProduct,
  drawPaginationButtons,
} from "./index-show-products-views.js";
import {
  getProducts,
  getTag,
  getTagsList,
} from "./index-show-products-model.js";
import { fireEvent } from "../utils/fireEvent.js";
import {
  getPage,
  openAndFireNotification,
  writeNotification,
} from "../utils/utils.js";

function drawProducts(products, productContainer) {
  //comprueba si hay productos para mostrar
  //si no hay productos llama a buildNoProducts para pintar que no hay productos
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

export async function showProducts(productContainer, products) {
  //Iniciamos la ruleta de carga
  fireEvent("loading-spinner", productContainer);

  try {
    //Llamamos a la base de datos y si sale bien a drawProducts
    let productsAndEnd;
    if (products) {
      productsAndEnd = products;
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const page = parseInt(searchParams.get("page")) || 1;
      productsAndEnd = await getProducts(null, null, null, null, null, page);
    }
    const { productsGet, end } = productsAndEnd;

    //vaciamos products container
    productContainer.innerHTML = "";

    //le enviamos el productContainer y una lista de objetos producto
    hiddenNextButton(end);
    drawProducts(productsGet, productContainer);
    openAndFireNotification(productContainer);
    const page = getPage();
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

    fireEvent("notification", productContainer, `${error}`, "big", "error");
  }
}

export async function filterDrawController(filterContainer) {
  try {
    const tagsObjets = await getTagsList();

    const page = getPage();

    const tagList = [];
    tagsObjets.forEach((tag) => {
      tagList.push(tag.tag);
    });
    const filter = buildFilter(tagList, page);

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
  const formLimit = Number(limitElement.value);

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

export function paginationProductsController(paginationContainer) {
  paginationContainer.innerHTML = "";
  const searchParams = new URLSearchParams(window.location.search);
  const page = parseInt(searchParams.get("page")) || 1;
  paginationContainer.appendChild(drawPaginationButtons(page));
}

function hiddenNextButton(next) {
  if (next) {
    const nextButton = document.querySelector(".next-page");
    nextButton.setAttribute("class", "hidden");
  }
}
