
import { buildNoProducts, buildError, buildProduct } from "./index-show-products-views.js"
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
    fireEvent("loading-spinner","spinner","success",productContainer)
    
    //la vaciamos
    productContainer.innerHTML = ""

    try {
        //Llamamos a la base de datos y si sale bien a drawProducts
        const products = await getProducts()
        drawProducts(products,productContainer) //le enviamos el productContainer y una lista de objetos producto

    } catch (error) {
        //si sale mal llamamos a 
        const newError = buildError()
        productContainer.appendChild(newError)      
    }finally{
        fireEvent("loading-spinner","spinner","success",productContainer)

    }
}
