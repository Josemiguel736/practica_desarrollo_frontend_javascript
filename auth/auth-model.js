/**
 * Hace una petición a la API para crear el usuario
 */

export async function createUser(email, password) {
  try {
    const response = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      //mando los parametros por el body TIENEN QUE SER STRING por eso el metodo stringfy
      body: JSON.stringify({
        username: email,
        password,
      }),
      //envio la cabecera, en este caso es una request header
      headers: {
        //decimos en la cabecera que el archivo que enviamos es un JSON
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      //si la api da error al crear usuario lanzo un error
      throw new Error(response.status);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Hace una petición a la API para logear el usuario
 * retorna un token
 */
export async function loginUser(email, password) {
  const response = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: email,
      password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  const { accessToken } = await response.json();
  return accessToken;
}

/**
 * Hace una petición a la API para saber quien es el usuario logado
 * retorna un usuario
 */
export const getCurrentUserInfo = async () => {
  const token = localStorage.getItem("jwt");
  try {
    const response = await fetch(`http://localhost:8000/auth/me`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    });

    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
};
