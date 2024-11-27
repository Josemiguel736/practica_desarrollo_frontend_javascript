//html que vamos a mostrar a nuestro usuario
export const buildProduct= (product)=>{
    //convierto la lista de tags a un string
    const tagString = product.tags.join(", ")
    const tagQuery = product.tags.join("%2C")

    //creo un nodo con mi html dentro
    const newProduct = document.createElement('div')
    if (product.image === ""){
        product.image="assets/product-photos/no_image.jpg"
    }
        newProduct.innerHTML=`
        
        <a class="product" href="product-detail.html?id=${product.id}&tags=${tagQuery}">
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

export const buildFilter=(tagList)=>{

    const form = document.createElement('form')
    form.setAttribute("class","filter")
    form.innerHTML = `
    <label class="input label" for="name">Buscar:</label>
    <input class="input" type="text" id="name" name="name" value="">
    <label class="input label" for="min">Minimo</label>
    <input class="input" type="number" id="min" name="min" value="">
    <label class="input label" for="max">Máximo</label>
    <input class="input" type="number" id="max" name="max" value="">
    <label class="input label" for="tag">Tags:</label>
    
    `
    const select = document.createElement("select")
    select.setAttribute("class","input")
    select.setAttribute("id","tag")
    select.setAttribute("name","tag")

    tagList.forEach((tagElement,index) => {
        const tagSelect = document.createElement('option')
        if(index===0){
            tagSelect.setAttribute("selected","true")
       }
        tagSelect.innerHTML=`${tagElement}`
        select.appendChild(tagSelect)        
    });


    form.appendChild(select) 
    const button = document.createElement("button")
    button.setAttribute("type","submit")
    button.innerHTML=`Filtrar`
    button.setAttribute("class","button")
    form.appendChild(button) 

    return form
}
