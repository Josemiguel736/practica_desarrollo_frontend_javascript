import { fireEvent } from "../utils/fireEvent.js"
import { writeNotification } from "../utils/utils.js"
import { createProduct } from "./create-product-model.js"


export   function createProductController(createProductContainer){
    createProductContainer.addEventListener("submit", async (event) =>{
        try {
        event.preventDefault()
        const nameElement = createProductContainer.querySelector("#name")
        const name = nameElement.value

        const descriptionElement = createProductContainer.querySelector("#description")
        const description = descriptionElement.value

        const imageElement = createProductContainer.querySelector("#image")
        if (imageElement.value === ""){
            imageElement.value="../assets/product-photos/no_image.jpg"
        }
        const image = imageElement.value

        const typeProductElement = createProductContainer.querySelector("#typeProduct")
        const typeProduct = typeProductElement.value

        const tagsProductElement = createProductContainer.querySelector("#tags")
        const tagsString = tagsProductElement.value
        const tagList =separateTags(tagsString)

        const priceElement = createProductContainer.querySelector("#price")
        const price = Number(priceElement.value)
        fireEvent("loading-spinner",createProductContainer)
        
          await handleProductCreation(name,description,image,typeProduct,price,tagList)
            
        } catch (error) {
            
            fireEvent("notification",createProductContainer,error,"big","error")
        }finally{
            fireEvent("loading-spinner",createProductContainer)

        }
    })
}

async function  handleProductCreation(name,description,image,typeProduct,price,tagList){
    
    const token = localStorage.getItem("jwt")
   await createProduct(name,description,image,typeProduct,price,tagList,token)
   writeNotification("notification","Producto creado correctamente","big","success")
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