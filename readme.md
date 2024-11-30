# ApiPop


## Descripción del proyecto
ApiPop es una página web creada usando como backend sparrest ()

### Start

ApiPop

````
- git pull https://github.com/Josemiguel736/practica_desarrollo_frontend_javascript.gits

````

Sparrest

````
- git pull https://github.com/kasappeal/sparrest.js

- Insert the attached db.json into the ApiPop repository inside sparrest

- Run the server with npm start

````

Default users 

````
- user1@example.com || 1234

- user2@example.com || 1234

````

Los tres primeros productos están creados con user2, el resto con user1


### Funcionalidades usuarios

ApiPop permite si NO estas logueado:
- Loguear usuarios
- Crear usuarios 
- Ver los productos disponibles

ApiPop permite si estas logueado:
- Crear productos (al crear los productos se normalizan los tags para evitar tags iguales con mayúsculas y minúsculas diferentes).
- Borar productos (Solo si el usuario es el dueño).
- Editar productos (Solo si el usuario es el dueño)(al editar los productos se normalizan los tags para evitar tags iguales con mayúsculas y minúsculas diferentes).

### Productos
Los productos en ApiPop deben:
- Tener un nombre
- Tener una descripción
- Contener tags
- Tener un precio
- Tener un proposito (comprar o vender)
- Opcionalmente pueden tener una imágen (si no la tiene asignamos en las vistas una por defecto por estetica, pero no se guardará en la base de datos)

### Notificaciones

 He separado las notificaciones al usuario en dos tipos Error y Success, y en dos formatos Big y Little.

- Error se mostrarán en rojo, en formato Big se mostrarán durante 10 segundos, en little serán permanentes.

- Success se mostrarán en verde y su duración sera de 4 segundos, en little no mostramos success.

En caso de tener varias notificaciones se pondrán en cola y se irán mostrando dejando 70 milisegundos de espacio entre ellas.

Existen dos formas de mostrar una notificación.

- La funcion fireEvent, informandole del tipo de notificación que es, el mensaje, el contenedor donde se mostrará y el formato.

- openAndFireNotification informandole el contenedor donde se mostrará, busca en el local estorage un item llamado notificacion, si existe lo recoge y dispara la notificación .

Al cargar los productos muestro una notificación indicando que los productos han sido cargados correctamente, pero solo la mostrará si es la primera página, en las siguientes he omitido esta notificación.

En las notificaciones de error he intentado no darle excesiva información al usuario, practicamente solo sabrá si ha sido error del servidor o ha sido error del usuario.

### Sesion

En el navbar en función de si el usuario está logueado o no le mostraremos unas opciones u otras, esto lo hacemos comprobando si posee un token de autenticación o no.

En el caso de que el usuario esté en una página que no sea el index al momento de desloguearse actualizaremos la página para asegurar que la página se comporta adecuadamente.

### Detalle de producto

Si el usuario es el dueño mostraremos unos botones de opciones (borrar, editar producto).

- Borrar: Antes de borrar pediremos confirmación mediante un alert, si es positiva borarremos el producto.

- Editar: Al presionar el botón editar mostraremos un formulario con los valores actuales del tag, si la foto no tiene un enlace y es la fotografía por defecto se lo mostraremos vacio, una vez haya modificado guardaremos sus cambios pero hay un paso adicional para los tags, comprobaremos si esos tags existen ya o no, de existir apuntaremos su referencia en el producto, de no existir además los crearemos.

### Filtrado 

Apipop permite filtrar productos por: 

- Nombre: Busca coincidencias parciales con el nombre, con una ligera modificación podría buscar por nombre exacto pero creo que esta opción mejora la experiencia de usuario.

- Precio minimo

- Precio máximo  

- Rango de precios

- Tag

Nota: Para obtener los tags en el filtro estamos haciendo una petición muy grande a la API, en una versión funcional esto no debería de suceder

### Paginación 
De forma normal la página mostrará 10 productos por página, se puede cambiar desde el filtro, así como usar los botones siguiente o anterior desde la zona inferior de donde mostramos los productos.

En caso de no haber una página anterior deshabilitamos el boton, en caso de no haber una página siguiente ocultamos el botón.

### Carga

Se han controlado los estados de carga de la página mostrando en las tareas que requieren llamar a la API un HTML animado con el nombre de la página.





