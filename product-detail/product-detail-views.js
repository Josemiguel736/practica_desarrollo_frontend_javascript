
/**
 * Pinta un producto
 */
export const buildDetailProduct = (product, productTags) => {
  //creo un nodo con mi html dentro
  const tagString = productTags.join(", ");
  const newProduct = document.createElement("div");
  newProduct.setAttribute("class", "product-detail");
  console.log(product.image);

  newProduct.innerHTML = `        
        
        <img src=${product.image} alt=${product.name}>
        <h3>${product.name}</h3>
        <span class="description">${product.description}</span>
        <span>${product.typeProduct}</span>
         <span>${tagString}</span>
        <h4>${product.price} €</h4>
         `;

  return newProduct;
};

/**
 * Pinta los botones de editar y borrar
 */
export const deleteAndEditButton = () => {
  //creo un nodo con mi html dentro
  const deleteAndEditButton = document.createElement("div");
  deleteAndEditButton.setAttribute("class", "container-detail");
  deleteAndEditButton.innerHTML = ` 
    <form class="delete ">
    <button type="submit" id="delete-button"> Borrar Producto </button>
    </form><form class="edit">
    <button type="submit" id="edit-button"> Editar Producto </button>
    </form>
    `;
  return deleteAndEditButton;
};

/**
 * Pinta un mensaje de no hay productos
 */
export const buildNoProduct = () => {
  //creo un nodo con mi html dentro
  const newProduct = document.createElement("span");
  newProduct.innerHTML = "No hay ningún producto para mostrar";

  return newProduct;
};

/**
 * Pinta el formulario para editar un producto
 */
export const buildEditProductForm = (product, productTags) => {
  if (product.image === "../assets/product-photos/no_image.jpg") {
    product.image = "";
  }
  return `
    <section>
        <div class="form-edit">
        <form>
            <h3>Actualizar producto</h3>
        <label for="name">Nombre del producto</label>
        <input type="text" name="name" value="${product.name}" id="name" required>
        
        <label for="description">Descripción del producto</label>
        <textarea name="description"  id="description" cols="30" rows="10" required>${product.description}</textarea>
        
        <label for="image">Imágen</label>
        <input type="text" name="image" value="${product.image}" id="image">
        
        <label for="type-product">Que quieres hacer</label>
        <select class="input" id="typeProduct" name="type-product">
            <option selected>Comprar</option>
            <option>Vender</option>
        </select>

        <label for="tags">Tags</label>
        <input type="text" name="tags" value="${productTags}" id="tags" required>
        
        <label for="price" >precio</label>
        <input type="number" min="0" name="price" value="${product.price}" id="price" required>
        
        <button class="edit-button" type="submit">Actualizar producto</button>
    </form>
</div>
    
    
    `;
};
