

import { getFilterTag } from "../utils/utils.js"
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

export async function updateProduct(productId,name,description,image,typeProduct,tagsString,price,token){
try {
    
    const tagsId= await updateTagHandler(tagsString,token)
    const response = await fetch(`http://localhost:8000/api/products/${productId}`,{
        method:"PUT",
        //mando los parametros por el body TIENEN QUE SER STRING por eso el metodo stringfy
        body:JSON.stringify({
            name,
            description,
            image,
            typeProduct,
            price,
            tagsId
        }),
        //envio la cabecera, en este caso es una request header
        headers:{
            //decimos en la cabecera que el archivo que enviamos es un JSON
            "Content-type":"application/json",
            "Authorization": `Bearer ${token} `
        }
    });
    if (!response.ok) {
        if (response.status===401){
            throw new Error((`No tienes permiso para modificar este producto`))
        }else if (response.status===404){
            throw new Error(`No hemos podido modificar tu producto, por favor intentelo más tarde`)
        }            
    }

    
} catch (error) {
    throw new Error(error.message)
    
}}




async function updateTagHandler(tagsString,token) {

    const tagsId = []
    
    const tags=tagsString.split(",")

    // Primero, agregamos los tags y almacenamos sus ids
    for (const tag of tags) {
        // Busca si el tag ya existe en la lista
        const tagFetch =await getFilterTag(tag.trim())
        
        const existingTag = tagFetch.find(t => t.tag === tag.trim())
        
        if (existingTag) {
            tagsId.push(`%${existingTag.id}%`) // Si existe, agrega su id
        } else {
            // Si no existe, crea el tag
            const response = await addTag(tag, token) 
            tagsId.push(`%${response.id}%`) // Agrega el id del nuevo tag
        }
    }
    return tagsId

    


}


    
async function addTag(tag, token) {
    const response = await fetch("http://localhost:8000/api/tags", {
        method: "POST",
        body: JSON.stringify({ tag }),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al crear el tag')
    }

    const data = await response.json() 
    return data 
}