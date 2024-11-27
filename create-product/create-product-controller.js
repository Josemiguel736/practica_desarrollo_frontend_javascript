import { fireEvent } from "../utils/fireEvent.js"
import { createProduct } from "./create-product-model.js"


export  function createProductController(createProduct){
    createProduct.addEventListener("submit",(event)=>{
        try {
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
        const tagsString = tagsProductElement.value
        const tagList =separateTags(tagsString)

        const priceElement = createProduct.querySelector("#price")
        const price = Number(priceElement.value)
        
            handleProductCreation(name,description,image,typeProduct,price,tagList)
            
        } catch (error) {
            
            fireEvent("notification",createProduct,error,"big","error")
        }
    })
}

async function  handleProductCreation(name,description,image,typeProduct,price,tagList){
    const token = localStorage.getItem("jwt")
   await createProduct(name,description,image,typeProduct,price,tagList,token)
   window.location.href="/"

}

function separateTags(tagsString){
    if (tagsString!=""){
        const listOfTags = tagsString.split(",").map(item => item.trim())
        
        return listOfTags
    }else{
        return undefined
    }

}