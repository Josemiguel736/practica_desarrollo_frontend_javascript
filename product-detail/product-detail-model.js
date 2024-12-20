import { capitalize, getTag } from "../utils/utils.js";

/**
 * Obtiene un producto y el usuario que lo creoy los retorna
 * 
 */
export async function getProduct(productId) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/products/${productId}?_expand=user`
    );

    if (!response.ok) {
      throw new Error("El recurso no existe");
    }

    //Lo convertimos a Json
    const product = await response.json();
    return product;

  } catch (error) {
    throw error;
  }
}

/**
 * llama a la api para eliminar un producto
 */
export async function deleteProduct(productId, token) {
  try {
    //Envío a products el productId del producto que quiero borrar
    const response = await fetch(
      `http://localhost:8000/api/products/${productId}`,
      {
        method: "DELETE",
        //envio la cabecera con el token del usuario que quiere borrar el producto (Deberá de ser el dueño o la API lanzara un error)
        headers: {
          //decimos en la cabecera que el archivo que enviamos es un JSON
          "Content-type": "application/json",
          Authorization: `Bearer ${token} `,
        },
      }
    );
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(`No tienes permiso para eliminar este producto`);
      } else if (response.status === 404) {
        throw new Error(
          `No hemos podido eliminar tu producto, por favor intentelo más tarde`
        );
      }
    }
  } catch (error) {
    throw new Error(
      "No hemos podido eliminar tu producto, por favor intentelo más tarde"
    );
  }
}

/**
 * llama a la api para actualizar un producto
 */
export async function updateProduct(
  productId,
  name,
  description,
  image,
  typeProduct,
  tagsString,
  price,
  token
) {
  try {
    const tagsList = await updateTagHandler(tagsString, token);
    const response = await fetch(
      `http://localhost:8000/api/products/${productId}`,
      {
        method: "PUT",
        //mando los parametros por el body TIENEN QUE SER STRING por eso el metodo stringfy
        body: JSON.stringify({
          name,
          description,
          image,
          typeProduct,
          price,
          tagsList,
        }),
        //envio la cabecera, en este caso es una request header
        headers: {
          //decimos en la cabecera que el archivo que enviamos es un JSON
          "Content-type": "application/json",
          Authorization: `Bearer ${token} `,
        },
      }
    );
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(`No tienes permiso para modificar este producto`);
      } else if (response.status === 404) {
        throw new Error(
          `No hemos podido modificar tu producto, por favor intentelo más tarde`
        );
      }
    }
  } catch (error) {
    throw new Error(
      `No hemos podido modificar tu producto, por favor intentelo más tarde`
    );
  }
}

/**
 * llama a la api para actualizar los tag del usuario
 * si no existe lo crea, si existe añade su id
 * retorna una lista de tagsId validos para el usuario
 */
async function updateTagHandler(tagsString, token) {
  try {
    const tagsId = [];

    const tags = tagsString.split(",");

    // Primero, agregamos los tags y almacenamos sus ids
    for (const tag of tags) {
      // Busca si el tag ya existe en la lista
      const tagFetch = await getTag(capitalize(tag.trim()) );

      const existingTag = tagFetch.find((t) => t.tag === capitalize(tag.trim()));

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
    throw new Error("Error al actualizar los tag");
  }
}

/**
 * llama a la api para crear un tag, retorna ese tag
 */
async function addTag(tag, token) {
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
}

