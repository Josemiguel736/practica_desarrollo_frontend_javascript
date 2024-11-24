export function buildAuthorizedSession(){
    return `
   <a href="/"> <h3>ApiPop</h3></a>
            <ul class="items_nav" >
                <li><a class="item_nav" href="create-product.html">Nuevo producto</a></li>
                <button type="submit"> Cerrar sesion </button> 
            </ul> 
    `
}

export function buildUnauthorizedSession(){
   return `
      <a href="/"> <h3>ApiPop</h3></a>      
            <ul class="items_nav" >
                <li><a class="item_nav" href="register.html">Registrarme</a></li>
                <li><a class="item_nav" href="login.html">Login</a></li>
            </ul> 
   `
}