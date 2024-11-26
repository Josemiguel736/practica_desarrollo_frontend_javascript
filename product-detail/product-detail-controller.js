import { getCurrentUserInfo } from "../auth/auth-model.js";
import { getProduct, deleteProduct, updateProduct } from "./product-detail-model.js";
import { buildDetailProduct, buildEditProductForm, buildNoProduct, deleteAndEditButton } from "./product-detail-views.js";
import { fireEvent } from "../utils/fireEvent.js";

export async function productDetailController(productDetailContainer, productId) {
    try {
        //Iniciamos la ruleta de carga
        fireEvent("loading-spinner", productDetailContainer)
        const product = await getProduct(productId)
        productDetailContainer.appendChild(buildDetailProduct(product))
        await handleDrawOptionButtons(product, productDetailContainer)


    } catch (error) {
        if (error.message === "Failed to fetch") {
            fireEvent("notification", productDetailContainer, `El servidor no responde, por favor intentelo más tarde`, "big", "error")
            productDetailContainer.appendChild(buildNoProduct())
        } else {
            fireEvent("notification", productDetailContainer, `${error.message} `, "big", "error")
            productDetailContainer.appendChild(buildNoProduct())
        }
    } finally {
        //Finalizamos la ruleta de carga en cualquier caso
        fireEvent("loading-spinner", productDetailContainer)
    }
}


async function ownerOfProduct() {
    try {
        const user = await getCurrentUserInfo()
        return user.id
    }
    catch (error) {
        throw new Error(error.message)
    }
}

async function callDeleteProduct(productId) {
    try {
        const token = localStorage.getItem("jwt")
        await deleteProduct(productId, token)
        window.location.href = "/"
    } catch (error) {
        throw new Error(error.message)
    }
}

async function handleDrawOptionButtons(product, productDetailContainer) {
    try {
        //busco quien es el dueño del producto
        const me = await ownerOfProduct()

        //si el dueño es el usuario logueado
        if (product.user.id === me) {

            // Busco el contenedor del producto
            const productContainer = productDetailContainer.querySelector(".product-detail")

            //pinto en el los botones de editar y borrar
            productContainer.appendChild(deleteAndEditButton())

            //busco el boton de borrado
            const deleteButton = productContainer.querySelector(".delete")

            //busco el boton de editar
            const editButton = productContainer.querySelector(".edit")

            //escucho el evento submit en el boton de borrado

            deleteButton.addEventListener("submit", async (event) => {

                //evito la propagacion del evento
                event.preventDefault()
                await handlerProductDelete(product, productDetailContainer)
            })

            editButton.addEventListener("submit", async (event) => {

                //evito la propagacion del evento
                event.preventDefault()
                await handlerEditProduct(product, productContainer, productDetailContainer)
            })
        }
    } catch (error) {
        fireEvent("notification", productDetailContainer, `${error.message} `, "big", "error")
    }
}

async function handlerProductDelete(product, productDetailContainer) {
    //pido confirmación antes de borrar el producto
    const confirmDeleteProduct = confirm("Seguro que esea borrar el producto?")
    try {
        //si el usuario confirma
        if (confirmDeleteProduct) {
            //reproduzco la ruleda de carga y llamo al la función handleProductDelete
            fireEvent("loading-spinner", productDetailContainer)
            await callDeleteProduct(product.id)
        }

    } catch (error) {
        if (error.message === "Failed to fetch") {
            fireEvent("notification", productDetailContainer, `No ha sido posible eliminar el producto, por favor intentelo más tarde`, "big", "error")
        } else {
            fireEvent("notification", productDetailContainer, `${error.message}`, "big", "error")
        }
    } finally {
        if (confirmDeleteProduct) {
            fireEvent("loading-spinner", productDetailContainer)
        }
    }
}

async function handlerEditProduct(product, productContainer, productDetailContainer) {
    try {

        productContainer.innerHTML = buildEditProductForm(product)
        const select = productContainer.querySelector("#typeProduct");
        if (select) {
            // Establece el valor basado en product.typeProduct
            select.value = product.typeProduct; // Suponiendo que "typeProduct" es el campo correspondiente
        }

        const editProductContainer = productContainer.querySelector(".edit-button")
        editProductContainer.addEventListener("click", async (event) => {
            //evito la propagacion del evento
            event.preventDefault()
            const nameElement = productContainer.querySelector("#name")
            const name = nameElement.value


            const descriptionElement = productContainer.querySelector("#description")
            const description = descriptionElement.value

            const imageElement = productContainer.querySelector("#image")
            const image = imageElement.value

            const typeProductElement = productContainer.querySelector("#typeProduct")
            const typeProduct = typeProductElement.value

            const priceElement = productContainer.querySelector("#price")
            const price = priceElement.value
            try {
                await callUpdateProduct(product, name, description, image, typeProduct, price)
            } catch (error) {
                if (error.message === "Failed to fetch") {
                    fireEvent("notification", productDetailContainer, `Ahora mismo no se puede actualizar el producto, por favor intentelo más tarde`, "big", "error")
                } else {
                    fireEvent("notification", productDetailContainer, `${error.message}`, "big", "error")
                }
            }
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

async function callUpdateProduct(product, name, description, image, typeProduct, price) {
    try {
        const token = localStorage.getItem("jwt")
        await updateProduct(product.id, name, description, image, typeProduct, price, token)
        window.location.href = `/product-detail.html?id=${product.id}`
    } catch (error) {
        throw new Error(error.message)
    }
}