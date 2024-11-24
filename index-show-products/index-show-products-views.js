//html que vamos a mostrar a nuestro usuario
export const buildProduct= (product)=>{
    //creo un nodo con mi html dentro
    const newProduct = document.createElement('div')
    if (product.image != ""){
        newProduct.innerHTML=`
        <div class="product">
        <img src=${product.image} alt=${product.name}>
        <h3>${product.name}</h3>
        <span>${product.description}</span>
        <span>${product.typeProduct}</span>
        <h4>${product.price} €</h4>
        </div> `
    }else{
        newProduct.innerHTML=`
        <div class="product">
        <img src="assets/product-photos/no_image.jpg" alt=${product.name}>        
        <h3>${product.name}</h3>
        <span>${product.description}</span>
        <span>${product.typeProduct}</span>
        <h4>${product.price} €</h4>
        </div> `
    }   
    return newProduct
}

export const buildNoProducts= ()=>{
    //creo un nodo con mi html dentro
    const newProduct = document.createElement('span')
    newProduct.innerHTML="No hay productos para mostrar"

    return newProduct
}

