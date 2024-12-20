import { imageDefault } from "../utils/utils.js";

/**
 * Pinta un producto
 */
export const buildProduct = (product) => {
  //convierto la lista de tags a un string
  const tagString = product.tags.join(", ");
  const tagQuery = product.tags.join("%2C");

  //creo un nodo con mi html dentro
  const newProduct = document.createElement("div");

  newProduct.innerHTML = `
        
        <a class="product" href="product-detail.html?id=${product.id}&tags=${tagQuery}">
        <img src=${product.image || imageDefault} alt=${product.name}>
        <h3>${product.name}</h3>
        <span>${product.description}</span>
        <span>${product.typeProduct}</span>
         <span>${tagString}</span>
        <h4>${product.price} €</h4>
         </a> `;

  return newProduct;
};

/**
 * Pinta un aviso de que no hay productos para mostrar
 */
export const buildNoProducts = () => {
  //creo un nodo con mi html dentro
  const newProduct = document.createElement("span");
  newProduct.innerHTML = "No hay productos para mostrar";

  return newProduct;
};

/**
 * Pinta el filtro de productos
 */
export const buildFilter = (tagList) => {
  const form = document.createElement("form");
  form.setAttribute("class", "filter");
  form.innerHTML = `
    <label class="input label" for="name">Buscar:</label>
    <input class="input" type="text" id="name" name="name" value="">
    <label class="input label" for="min">Minimo</label>
    <input class="input" type="number" id="min" name="min" value="">
    <label class="input label" for="max">Máximo</label>
    <input class="input" type="number" id="max" name="max" value="">
    <label class="input label" for="limit">Productos por página</label>
    <select class="input" id="limit" name="limit">
            <option>5</option>
            <option selected>10</option>
            <option>25</option>
            <option>50</option>
        </select>
    <label class="input label" for="tag">Tags:</label>
    
    
    `;
  const select = document.createElement("select");
  select.setAttribute("class", "input");
  select.setAttribute("id", "tag");
  select.setAttribute("name", "tag");
  const tagAll = document.createElement("option");
  tagAll.innerHTML = `Todos`;
  select.appendChild(tagAll);

  tagList.forEach((tagElement) => {
    const tagSelect = document.createElement("option");

    tagSelect.innerHTML = `${tagElement}`;
    select.appendChild(tagSelect);
  });

  form.appendChild(select);
  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.innerHTML = `Filtrar`;
  button.setAttribute("class", "button");
  form.appendChild(button);

  return form;
};

/**
 * Pinta los botones de paginación
 * comprueba si la página es 1 y oculta el botón de 
 * página anterior
 */
export function drawPaginationButtons(page) {
  // Controles de paginación
  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination");

  const prevButton = document.createElement("button");
  prevButton.setAttribute("type", "button");
  prevButton.innerHTML = "Anterior";
  prevButton.setAttribute("class", "button prev-page");
  prevButton.disabled = page <= 1;

  const nextButton = document.createElement("button");
  nextButton.setAttribute("type", "button");
  nextButton.innerHTML = "Siguiente";
  nextButton.setAttribute("class", "button next-page");
  if (page === 1) {
    prevButton.setAttribute("class", "hidden");
  }

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(nextButton);
  return paginationContainer;
}

/**
 * Oculta el boton de siguiente
 */
export function hiddenNextButton(end) {
  if (end) {
    const nextButton = document.querySelector(".next-page");
    nextButton.setAttribute("class", "hidden");
  }
}
