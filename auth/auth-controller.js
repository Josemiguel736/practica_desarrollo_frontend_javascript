import { createUser } from "./auth-model.js";
import { fireEvent } from "../utils/fireEvent.js";
import { mailRegExp, writeNotification } from "../utils/utils.js";
import { loginUser } from "./auth-model.js";

/**
 * Maneja la logica necesaria para registrar a un usuario
 * recoje los parametros de la query y los valida
 */
export function registerUserModel(registerContainer) {
  registerContainer.addEventListener("submit", (event) => {
    event.preventDefault();

    //Recogemos los valores de la query
    const userEmailElement = registerContainer.querySelector("#mail");
    const passwordElement = registerContainer.querySelector("#password");
    const passwordConfirmElement =
      registerContainer.querySelector("#password-confirm");

    const userEmail = userEmailElement.value;
    const password = passwordElement.value;
    const passwordConfirm = passwordConfirmElement.value;

    //buscamos errores
    const emailRegExp = new RegExp(mailRegExp);
    const errors = [];
    if (!emailRegExp.test(userEmail)) {
      errors.push(["el email no es valido", "emailNotification"]); //si los hay, añadimos errores a la lista de errores
    } else {
      fireEvent("emailNotification", registerContainer, "", "little", "error"); //Si no hay errorres reiniciamos los valores a ""
    }
    if (password != passwordConfirm) {
      errors.push(["las password no son iguales", "passNotification"]);
    } else {
      fireEvent("passNotification", registerContainer, "", "little", "error");
    }
    for (const error of errors) {
      fireEvent(error[1], registerContainer, error[0], "little", "error"); //Si ha habido errores enviamos notificaciones de error
    }
    if (errors.length === 0) {
      handleCreateUser(userEmail, password, registerContainer);
    }
  });
}

/**
 * Hace una petición al modelo para crear el usuario y también lo loguea
 * maneja los estados de carga y error
 */
const handleCreateUser = async (userEmail, password, registerContainer) => {
  fireEvent("loading-spinner", registerContainer);
  try {
    await createUser(userEmail, password); //Llamamos al modelo para crear el usuario
    const token = await loginUser(userEmail, password); //Lo logueamos y recibimos el token de usuario de la respuesta
    localStorage.setItem("jwt", token); //guardamos su token
    writeNotification(
      "notification",
      "Usuario creado correctamente",
      "big",
      "success"
    );

    window.location.href = "/";
  } catch (error) {
    if (error.message === "Failed to fetch") {
      //Según el error que nos mande el modelo informaremos de una forma u otra
      fireEvent(
        "notification",
        registerContainer,
        "El servidor no está disponible en este momento, por favor intentelo más tarde",
        "big",
        "error"
      );
    } else if (error.message === "400") {
      fireEvent(
        "emailNotification",
        registerContainer,
        "El email ya existe",
        "little",
        "error"
      );
    }
  } finally {
    fireEvent("loading-spinner", registerContainer);
  }
};

/**
 * Maneja la logica necesaria para logear a un usuario
 * recibe los parametros de la query y los valida
 */
export function loginController(loginContainer) {
  try {
    loginContainer.addEventListener("submit", (event) => {
      event.preventDefault();
      const userEmailElement = loginContainer.querySelector("#mail");
      const passwordElement = loginContainer.querySelector("#password");

      const userEmail = userEmailElement.value;
      const password = passwordElement.value;

      const emailRegExp = new RegExp(mailRegExp);
      if (!emailRegExp.test(userEmail)) {
        fireEvent(
          "emailNotification",
          loginContainer,
          "El e-mail no es correcto",
          "little",
          "error"
        );
      } else {
        handleLogin(userEmail, password, loginContainer);
      }
    });
  } catch (error) {
    fireEvent(
      "notification",
      loginContainer,
      "El servidor no está disponible en este momento, por favor intentelo más tarde",
      "big",
      "error"
    );
  }
}

/**
 * Hace una petición al modelo para logear al usuario
 * Maneja estados de carga y error
 */
const handleLogin = async (userEmail, password, loginContainer) => {
  try {
    fireEvent("loading-spinner", loginContainer);

    const token = await loginUser(userEmail, password); //llama al modelo del login
    writeNotification(
      "notification",
      "Sesión iniciada correctamente",
      "big",
      "success"
    );
    localStorage.setItem("jwt", token);

    window.location.href = "/";
  } catch (error) {
    if (error.message === "401") {
      fireEvent(
        "emailNotification",
        loginContainer,
        "Email o contraseña incorrectos",
        "little",
        "error"
      );
    } else {
      fireEvent(
        "notification",
        loginContainer,
        "El servidor no está disponible en este momento, por favor intentelo más tarde",
        "big",
        "error"
      );
    }
  } finally {
    fireEvent("loading-spinner", loginContainer);
  }
};
