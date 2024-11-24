export async function getProducts() {
    try {
        //conexion con la api para obtener productos
        const response = await fetch("http://localhost:8000/api/products")
        
        if(!response.ok){
            throw new Error("El recurso no existe o está inaccesible")
        }
        const products = await response.json()
        return products

    } catch (error) {
        throw new Error("El servidor no responde, por favor vuelva a intentarlo más tarde")        
    }    
}