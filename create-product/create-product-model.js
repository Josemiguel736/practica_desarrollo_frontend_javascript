

export async function createProduct(name, description, image, typeProduct, price,tags, token) {
    
    const tagsId = await createTagIdList(tags,token)
    // Luego, hacemos el POST para crear el producto
    const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        body: JSON.stringify({
            name,
            description,
            image,
            typeProduct,
            price,
            tagsId // Usamos los ids de los tags creados
        }),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al crear el producto")
    }

    const product = await response.json() // Obtenemos la respuesta del producto creado
    return product; // Retornamos el producto creado
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

async function getTagList() {

    const response = await fetch("http://localhost:8000/api/tags")

    if (!response.ok) {
        throw new Error('Error al buscar el tag')
    }
    // Obtengo los datos de la respuesta
    const data = await response.json() 

    return data; 
    
}

async function createTagIdList(tags,token) {

    const tagsId = []
    const tagList =await getTagList()

    // Primero, agregamos los tags y almacenamos sus ids
    for (const tag of tags) {
        // Busca si el tag ya existe en la lista
        const existingTag = tagList.find(t => t.tag === tag)
        
        if (existingTag) {
            tagsId.push(existingTag.id) // Si existe, agrega su id
        } else {
            // Si no existe, crea el tag
            const response = await addTag(tag, token) 
            tagsId.push(response.id) // Agrega el id del nuevo tag
        }
    }
    return tagsId
    
}