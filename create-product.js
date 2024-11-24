import { createProductController } from "./create-product/create-product-controller.js";
import { isUserLoggedIn } from "./utils/utils.js";

if(!isUserLoggedIn()){
    window.location.href="/"
}

document.addEventListener("DOMContentLoaded",()=>{
    const createProductContainer = document.querySelector(".auth")
    createProductController(createProductContainer)

})