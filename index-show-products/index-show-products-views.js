//html que vamos a mostrar a nuestro usuario
export const buildProduct= (product)=>{
    //creo un nodo con mi html dentro
    const newProduct = document.createElement('div')
    if (product.image != ""){
        newProduct.innerHTML=`
        <div class="product">
        <img src=${product.image} alt=${product.name}>
        <div>${product.name}</div>
        <div>${product.cost} €</div>
        <div>${product.status}</div>
        </div> `
    }else{
        newProduct.innerHTML=`
        <div class="product">
        <div>${product.name}</div>
        <div>${product.cost} €</div>
        <div>${product.status}</div>
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

