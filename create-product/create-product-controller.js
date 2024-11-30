import { fireEvent } from "../utils/fireEvent.js";
import { writeNotification } from "../utils/utils.js";
import { createProduct } from "./create-product-model.js";

/**
 * Maneja la lógica para crear un producto
 * maneja los estados de error y de carga
 */
export function createProductController(createProductContainer) {
  createProductContainer.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();

      //recibimos los parametros de la query
      const nameElement = createProductContainer.querySelector("#name");
      const name = nameElement.value;

      const descriptionElement =
        createProductContainer.querySelector("#description");
      const description = descriptionElement.value;

      const imageElement = createProductContainer.querySelector("#image"); //si image no está informado le daremos una imágen por defecto
      if (imageElement.value === "") {
        imageElement.value = "../assets/product-photos/no_image.jpg";
      }
      const image = imageElement.value;

      const typeProductElement =
        createProductContainer.querySelector("#typeProduct");
      const typeProduct = typeProductElement.value;

      const tagsProductElement = createProductContainer.querySelector("#tags");
      const tagsString = tagsProductElement.value;
      const tagList = separateTags(tagsString);

      const priceElement = createProductContainer.querySelector("#price");
      const price = Number(priceElement.value);

      fireEvent("loading-spinner", createProductContainer);

      await handleProductCreation(
        name,
        description,
        image,
        typeProduct,
        price,
        tagList
      );
    } catch (error) {
      fireEvent(
        "notification",
        createProductContainer,
        "No se ha podido crear el producto, intentelo más tarde",
        "big",
        "error"
      );
    } finally {
      fireEvent("loading-spinner", createProductContainer);
    }
  });
}
/**
 * Llama al modelo para crear el producto
 */
async function handleProductCreation(
  name,
  description,
  image,
  typeProduct,
  price,
  tagList
) {
  try {
    const token = localStorage.getItem("jwt");
    await createProduct(
      name,
      description,
      image,
      typeProduct,
      price,
      tagList,
      token
    );
    writeNotification(
      "notification",
      "Producto creado correctamente",
      "big",
      "success"
    );
    window.location.href = "/";
  } catch (error) {
    throw error;
  }
}

/**
 * Recibe un string con tags separados con comas y devuelve una lista de strings
 */
function separateTags(tagsString) {
  const listOfTags = tagsString.split(",").map((item) => item.trim());
  return listOfTags;
}
