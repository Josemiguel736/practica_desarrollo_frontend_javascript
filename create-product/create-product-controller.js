import { createProduct } from "./create-product-model.js"


export function createProductController(createProduct){
    createProduct.addEventListener("submit",(event)=>{
        event.preventDefault()
        const nameElement = createProduct.querySelector("#name")
        const name = nameElement.value

        const descriptionElement = createProduct.querySelector("#description")
        const description = descriptionElement.value

        const imageElement = createProduct.querySelector("#image")
        const image = imageElement.value

        const typeProductElement = createProduct.querySelector("#typeProduct")
        const typeProduct = typeProductElement.value

        const tagsProductElement = createProduct.querySelector("#tags")
        const tagsProduct = typeProductElement.value

        const priceElement = createProduct.querySelector("#price")
        const price = Number(priceElement.value)

        handleProductCreation(name,description,image,typeProduct,price)
    })
}

function handleProductCreation(name,description,image,typeProduct,tags,price){
    const token = localStorage.getItem("jwt")
    createProduct(name,description,image,typeProduct,tags,price,token)
    window.location.href="/"

}