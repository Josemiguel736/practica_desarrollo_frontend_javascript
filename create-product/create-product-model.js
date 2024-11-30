import { getTag } from "../utils/utils.js";

/**
 * Hace una petición a la API para crear un producto
 * retorna un producto
 */
export async function createProduct(
  name,
  description,
  image,
  typeProduct,
  price,
  tags,
  token
) {
    try {
        const tagsList = await createTagIdList(tags, token);

  // Luego, hacemos el POST para crear el producto
  const response = await fetch("http://localhost:8000/api/products", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      image,
      typeProduct,
      price,
      tagsList,
      // Usamos los ids de los tags creados
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al crear el producto");
  }

  const product = await response.json(); // Obtenemos la respuesta del producto creado
  return product; // Retornamos el producto creado
        
    } catch (error) {
        throw error
        
    }
  
}

/**
 * Hace una petición a la API para crear un tag
 *  retorna un tag
 */
async function addTag(tag, token) {
    try {
        const response = await fetch("http://localhost:8000/api/tags", {
            method: "POST",
            body: JSON.stringify({ tag }),
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        
          if (!response.ok) {
            throw new Error("Error al crear el tag");
          }
        
          const tagResponse = await response.json();
          return tagResponse;
    } catch (error) {
        throw error
        
    }
  
}



/**
 * Crea una lista de tags para añadirsela al usuario
 * devuelve lista de tags id para el usuario
 */
async function createTagIdList(tags, token) {
  try {
    const tagsId = [];
    

    // Primero, agregamos los tags y almacenamos sus ids
    for (const tag of tags) {
      // Busca si el tag ya existe en la lista
      const tagFetch = await getTag(tag.trim());

      const existingTag = tagFetch.find((t) => t.tag === tag.trim());

      if (existingTag) {
        tagsId.push(`%${existingTag.id}%`); // Si existe, agrega su id
      } else {
        // Si no existe, crea el tag
        const response = await addTag(tag, token);
        tagsId.push(`%${response.id}%`); // Agrega el id del nuevo tag
      }
    }
    return tagsId;
  } catch (error) {
    throw error;
  }
}
