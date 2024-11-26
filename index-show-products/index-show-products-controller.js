
import { buildNoProducts,  buildProduct } from "./index-show-products-views.js"
import { getProducts } from "./index-show-products-model.js"
import { fireEvent } from "../utils/fireEvent.js"
import { openAndFireNotification } from "../utils/utils.js"

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
                        
        })
        productContainer.classList.toggle("loading") 
    }
}

export async function showProducts(productContainer,products){
    //Iniciamos la ruleta de carga
    fireEvent("loading-spinner",productContainer)

    try {
        //Llamamos a la base de datos y si sale bien a drawProducts
        let productsGet
        if(products){
            productsGet=products}else{
               productsGet = await getProducts()
            }

        //vaciamos products container
        productContainer.innerHTML = ""

        //le enviamos el productContainer y una lista de objetos producto
        drawProducts(productsGet,productContainer) 
        openAndFireNotification(productContainer)
        //Lanzamos una notificación indicando que los productos se cargaron correctamente
        fireEvent("notification",productContainer,"Productos cargados correctamente","big","success")

    } catch (error) {
        //Si ha ocurrido un error lanzaremos una notificación al usuario
        fireEvent("notification",productContainer,`${error}`,"big","error")     
    }
}

export async function filterProductsController(filterContainer) {
    const nameElement = filterContainer.querySelector("#name");
    const minElement = filterContainer.querySelector("#min");
    const maxElement = filterContainer.querySelector("#max");
    const tagElement = filterContainer.querySelector("#tag");
        
    const formName = nameElement.value;
    const formMin = minElement.value;
    const formMax = maxElement.value;
    const formTag = tagElement.value;
    
    // Llamamos a getFilteredProducts pasando los parámetros que hemos recogido del formulario
    try {
        const filterProducts = await getProducts(formName, formMin, formMax);
        return filterProducts
    } catch (error) {
        fireEvent("notification",filterContainer,`${error}`,"big","error")     
    }
}


export async function getTags() {
    try {
        
    } catch (error) {
        
    }
    
}