import { joinProductsWidthTags } from "../utils/utils.js";

export async function getProducts(formName,formMin,formMax) {
    try {
        //conexion con la api para obtener productos
        let url = 'http://localhost:8000/api/products?';

        if (formName) url += `name=${formName}&`
        if (formMax) url += `price_lte=${formMax}&`
        if (formMin) url += `price_gte=${formMin}&`

        // Eliminar el último "&" si existe
        url = url.endsWith('&') ? url.slice(0, -1) : url
        
        const [productsResponse,tagsResponse] = await Promise.all([
            fetch(url), 
            fetch('http://localhost:8000/api/tags')
        ])
        
        if(!productsResponse.ok || !tagsResponse.ok){
            throw new Error("El recurso no existe o está inaccesible")
        }
            const [products,tags] = await Promise.all([
                productsResponse.json(),
                tagsResponse.json()
            ])

            
            return joinProductsWidthTags(products,tags)

    } catch (error) {
        throw new Error("El servidor no responde, por favor vuelva a intentarlo más tarde")        
    }    
}


