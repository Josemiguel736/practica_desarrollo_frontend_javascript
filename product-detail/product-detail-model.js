
export async function getProduct(productId) {

    try {
        //Recibo el product asociado al productId que envío además de los datos del usuario dueño de ese producto
        const response = await fetch(`http://localhost:8000/api/products/${productId}?_expand=user`)

        //validamos la respuesta de la api y si no es valida lanzamos un error
        if (!response.ok) {
            throw new Error("El recurso no existe")
        }

        //Lo convertimos a Json
        const product = await response.json()
        return product

        //si sucede algún problema lanzamos un error con el mensaje
    } catch (error) {
        throw new Error(error.message)
    }

}

export async function deleteProduct(productId, token) {
    try {
        //Envío a products el productId del producto que quiero borrar
        const response = await fetch(`http://localhost:8000/api/products/${productId}`, {

            method: "DELETE",
            //envio la cabecera con el token del usuario que quiere borrar el producto (Deberá de ser el dueño o la API lanzara un error)
            headers: {
                //decimos en la cabecera que el archivo que enviamos es un JSON
                "Content-type": "application/json",
                "Authorization": `Bearer ${token} `
            }
    });
        if (response.ok) {
            alert(`El producto se ha eliminado correctamente.`);
        } else {
            
            if (response.status===401){
                throw new Error((`No tienes permiso para eliminar este producto`))
            }else if (response.status===404){
                throw new Error((`No hemos podido eliminar tu producto, por favor intentelo más tarde`))
            }            
        }
        
    } catch (error) {
        throw new Error(error.message)

    }


}

export async function updateProduct(productId,name,description,image,typeProduct,price, token){

    fetch(`http://localhost:8000/api/products/${productId}`,{
        method:"PUT",
        //mando los parametros por el body TIENEN QUE SER STRING por eso el metodo stringfy
        body:JSON.stringify({
            name,
            description,
            image,
            typeProduct,
            price
        }),
        //envio la cabecera, en este caso es una request header
        headers:{
            //decimos en la cabecera que el archivo que enviamos es un JSON
            "Content-type":"application/json",
            "Authorization": `Bearer ${token} `
        }
    });
}