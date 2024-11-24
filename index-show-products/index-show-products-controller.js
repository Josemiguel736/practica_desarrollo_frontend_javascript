
import { buildNoProducts,  buildProduct } from "./index-show-products-views.js"
import { getProducts } from "./index-show-products-model.js"
import { fireEvent } from "../utils/fireEvent.js"

function drawProducts(products, productContainer){
    //comprueba si hay productos para mostrar 
    //si no hay productos llama a buildNoProducts para pintar que no hay productos
    if(products.length===0){
        const noProduct = buildNoProducts()
        productContainer.appendChild(noProduct)
        
    }else{
        //si los hay llama en un bucle a buildProduct pasandole un objeto producto
        products.forEach(product => {
            const newProduct = buildProduct(product)
            productContainer.appendChild(newProduct) 
            productContainer.classList.toggle("flex")             
        })
    }
}

export async function showProducts(productContainer){
    //Iniciamos la ruleta de carga
    fireEvent("loading-spinner",productContainer)

    try {
        //Llamamos a la base de datos y si sale bien a drawProducts
        const products = await getProducts()

        //vaciamos products container
        productContainer.innerHTML = ""

        //le enviamos el productContainer y una lista de objetos producto
        drawProducts(products,productContainer) 

        //Lanzamos una notificación indicando que los productos se cargaron correctamente
        fireEvent("notification",productContainer,"Productos cargados correctamente","big","success")

    } catch (error) {
        //Si ha ocurrido un error lanzaremos una notificación al usuario
        fireEvent("notification",productContainer,`${error}`,"big","error")     
    }
}
