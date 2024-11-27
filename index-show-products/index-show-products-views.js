//html que vamos a mostrar a nuestro usuario
export const buildProduct= (product)=>{
    //convierto la lista de tags a un string
    const tagString = product.tags.join(", ")

    //creo un nodo con mi html dentro
    const newProduct = document.createElement('div')
    if (product.image === ""){
        product.image="assets/product-photos/no_image.jpg"
    }
        newProduct.innerHTML=`
        
        <a class="product" href="product-detail.html?id=${product.id}">
        <img src=${product.image} alt=${product.name}>
        <h3>${product.name}</h3>
        <span>${product.description}</span>
        <span>${product.typeProduct}</span>
         <span>${tagString}</span>
        <h4>${product.price} €</h4>
         </a> `
       
    return newProduct
}

export const buildNoProducts= ()=>{
    //creo un nodo con mi html dentro
    const newProduct = document.createElement('span')
    newProduct.innerHTML="No hay productos para mostrar"

    return newProduct
}

