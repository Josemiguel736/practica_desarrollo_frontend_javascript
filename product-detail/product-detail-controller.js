import { getCurrentUserInfo } from "../auth/auth-model.js";
import {
  getProduct,
  deleteProduct,
  updateProduct,
} from "./product-detail-model.js";
import {
  buildDetailProduct,
  buildEditProductForm,
  buildNoProduct,
  deleteAndEditButton,
} from "./product-detail-views.js";
import { fireEvent } from "../utils/fireEvent.js";
import { writeNotification } from "../utils/utils.js";

/**
 * Controla la lógica para pintar el detalle de un producto
 * editar un producto y borrar un producto
 */
export async function productDetailController(
  productDetailContainer,
  productId,
  productQueryTags
) {
  try {   
    fireEvent("loading-spinner", productDetailContainer);
    const product = await getProduct(productId);
    const productTags = productQueryTags.split("%2C");
    productDetailContainer.appendChild(
      buildDetailProduct(product, productTags)
    );

    await handleDrawOptionButtons(product, productTags, productDetailContainer);
  } catch (error) {

    if (error.message === "Failed to fetch") {
      fireEvent(
        "notification",
        productDetailContainer,
        `El servidor no responde, por favor intentelo más tarde`,
        "big",
        "error"
      );
      productDetailContainer.appendChild(buildNoProduct());
    } else {
      fireEvent(
        "notification",
        productDetailContainer,
        `${error.message} `,
        "big",
        "error"
      );
      productDetailContainer.appendChild(buildNoProduct());
    }
  } finally {
    //Finalizamos la ruleta de carga en cualquier caso
    fireEvent("loading-spinner", productDetailContainer);
  }
}

/**
 * Busca del dueño de un producto, retorna su user id
 */
async function ownerOfProduct() {
  try {
    const user = await getCurrentUserInfo();
    return user.id;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Llama al modelo para borrar un producto
 */
async function callDeleteProduct(productId) {
  try {
    const token = localStorage.getItem("jwt");
    await deleteProduct(productId, token);
    writeNotification(
      "notification",
      "Producto eliminado correctamente",
      "big",
      "success"
    );
    window.location.href = "/";
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Controla la lógica para pintar o no los botones de opción
 */
async function handleDrawOptionButtons(
  product,
  productTags,
  productDetailContainer
) {
  try {
    //busco quien es el dueño del producto
    const me = await ownerOfProduct();

    //si el dueño es el usuario logueado
    if (product.user.id === me) {
      // Busco el contenedor del producto
      const productContainer =
        productDetailContainer.querySelector(".product-detail");

      //pinto en el los botones de editar y borrar
      productContainer.appendChild(deleteAndEditButton());

      //busco el boton de borrado
      const deleteButton = productContainer.querySelector(".delete");

      //busco el boton de editar
      const editButton = productContainer.querySelector(".edit");

      //escucho el evento submit en el boton de borrado

      deleteButton.addEventListener("submit", async (event) => {
        
        event.preventDefault();
        await handlerProductDelete(product, productDetailContainer);
      });

      editButton.addEventListener("submit", async (event) => {
        
        event.preventDefault();
        await handlerEditProduct(
          product,
          productTags,
          productContainer,
          productDetailContainer
        );
      });
    }
  } catch (error) {
    fireEvent(
      "notification",
      productDetailContainer,
      `${error.message} `,
      "big",
      "error"
    );
  }
}

/**
 * Controla la lógica para borrar un producto
 */
async function handlerProductDelete(product, productDetailContainer) {
  //pido confirmación antes de borrar el producto
  const confirmDeleteProduct = confirm("Seguro que esea borrar el producto?");
  try {
    //si el usuario confirma
    if (confirmDeleteProduct) {
      //reproduzco la ruleda de carga y llamo al la función handleProductDelete
      fireEvent("loading-spinner", productDetailContainer);
      await callDeleteProduct(product.id);
    }
  } catch (error) {
    if (error.message === "Error: Failed to fetch") {
      fireEvent(
        "notification",
        productDetailContainer,
        `No ha sido posible eliminar el producto, por favor intentelo más tarde`,
        "big",
        "error"
      );
    } else {
      fireEvent(
        "notification",
        productDetailContainer,
        `${error.message}`,
        "big",
        "error"
      );
    }
  } finally {
    if (confirmDeleteProduct) {
      fireEvent("loading-spinner", productDetailContainer);
    }
  }
}

/**
 * Controla la lógica para editar un producto
 */
async function handlerEditProduct(
  product,
  productTags,
  productContainer,
  productDetailContainer
) {
  try {
    productContainer.innerHTML = buildEditProductForm(product, productTags);

    // Establece el valor basado en product.typeProduct
    const select = productContainer.querySelector("#typeProduct");   
    select.value = product.typeProduct;     

    const editProductContainer = productContainer.querySelector(".edit-button");
    editProductContainer.addEventListener("click", async (event) => {
      //evito la propagacion del evento
      event.preventDefault();
      const nameElement = productContainer.querySelector("#name");
      const descriptionElement = productContainer.querySelector("#description");
      const typeProductElement = productContainer.querySelector("#typeProduct");
      const tagsProductElement = productContainer.querySelector("#tags");
      const priceElement = productContainer.querySelector("#price");

      const validateElements = {
        nombre: nameElement.value,
        descripción: descriptionElement.value,
        tags: tagsProductElement.value,
        precio: priceElement.value,
      };

      const name = nameElement.value;
      const description = descriptionElement.value;

      const imageElement = productContainer.querySelector("#image");
      if (imageElement.value === "") {
        imageElement.value = "../assets/product-photos/no_image.jpg";
      }
      const image = imageElement.value;

      const typeProduct = typeProductElement.value;

      const tagsProduct = tagsProductElement.value;

      const price = priceElement.value;
      try {
        if (validateForm(validateElements) === true) {
          fireEvent("loading-spinner", productDetailContainer);
          await callUpdateProduct(
            product,
            name,
            description,
            image,
            typeProduct,
            tagsProduct,
            price
          );
          writeNotification(
            "notification",
            "Producto actualizado correctamente",
            "big",
            "success"
          );
        }
      } catch (error) {
        if (error.message === "Failed to fetch") {
          fireEvent(
            "notification",
            productDetailContainer,
            `Ahora mismo no se puede actualizar el producto, por favor intentelo más tarde`,
            "big",
            "error"
          );
        } else {
          fireEvent(
            "notification",
            productDetailContainer,
            `${error.message}`,
            "big",
            "error"
          );
        }
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Llama al modelo para actualizar un producto
 */
async function callUpdateProduct(
  product,
  name,
  description,
  image,
  typeProduct,
  tagsProduct,
  price
) {
  try {
    const token = localStorage.getItem("jwt");
    await updateProduct(
      product.id,
      name,
      description,
      image,
      typeProduct,
      tagsProduct,
      price,
      token
    );
    window.location.href = `/`;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Valida que el formulario sea valido, retorna un bool
 */
function validateForm(validateElements) {
  const emtyItems = [];
  let alertMessage = "Por favor rellena";

  for (const key in validateElements) {
    const value = validateElements[key];
    if (value === "") {
      emtyItems.push(key);
    }
  }

  if (emtyItems.length != 0) {
    alertMessage += ` ${emtyItems.join(", ")} antes de continuar`;
    if (emtyItems.length > 1) {
      const indexLastComma = alertMessage.lastIndexOf(",");
      alertMessage =
        alertMessage.slice(0, indexLastComma) +
        " y" +
        alertMessage.slice(indexLastComma + 1);
    }
    alert(alertMessage);
    return false;
  }
  return true;
}
