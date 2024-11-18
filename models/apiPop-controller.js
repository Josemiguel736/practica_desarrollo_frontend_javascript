import { getProducts } from "./apiPop-model.js";
import { buildNoProducts,buildProduct } from "./apiPop-views.js";

const loadingSpinner = () =>{
    const spinner = document.querySelector(".loading-spinner")
    spinner.classList.toggle("hidden")
}
    

function drawProducts(products, productContainer){
    if(products.length===0){
        const noProduct = buildNoProducts()
        productContainer.appendChild(noProduct)
    }else{
        products.forEach(product => {
            const newProduct = buildProduct(product)
            productContainer.appendChild(newProduct)            
        })
    }
}

async function showProducts(){
    loadingSpinner()
    const productContainer = document.querySelector(".products")
    productContainer.innerHTML = ""

    try {
        const products = await getProducts()
        drawProducts(products,productContainer)

    } catch (error) {
        const newError = buildNoProducts()
        productContainer.appendChild(newError)        
    }finally{
        loadingSpinner()

    }
}

document.addEventListener("DOMContentLoaded",showProducts)