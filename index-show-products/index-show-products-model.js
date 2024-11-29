import { joinProductsWidthTags } from "../utils/utils.js";

export async function getProducts(formName, formMin, formMax, tagSearch,limit,page) {
    try {
        if(!page){
            page=1
        }
        if(!limit){
            limit=10
        }
        //conexion con la api para obtener productos
        let url = `http://localhost:8000/api/products?_sort=updatedAt&_order=desc&_page=${page}&_limit=${limit}&` ;

        if (formName) url += `name_like=${formName}&`
        if (formMax) url += `price_lte=${formMax}&`
        if (formMin) url += `price_gte=${formMin}&`
        if (tagSearch) url += `tagsList_like=%${tagSearch}%&`

        // Eliminar el último "&" si existe
        if(url!=`http://localhost:8000/api/products?_page=${page}&_limit=${limit}&` ){
        url = url.endsWith('&') ? url.slice(0, -1) : url}

        const [productsResponse, tagsResponse] = await Promise.all([
            fetch(url),
            fetch('http://localhost:8000/api/tags?_limit=150')
        ])

        if (!productsResponse.ok || !tagsResponse.ok) {
            throw new Error("El recurso no existe o está inaccesible")
        }
        const totalCount = Number( productsResponse.headers.get('X-Total-Count'))
        const end = isFinalPage(totalCount,limit,page)       
        
        const [products, tags] = await Promise.all([
            productsResponse.json(),
            tagsResponse.json()
        ])
        
        const productsGet=joinProductsWidthTags(products, tags)
        return {productsGet,end}

    } catch (error) {
        throw new Error("El servidor no responde, por favor vuelva a intentarlo más tarde")
    }
}


export async function getTagsList() {

    try {
        const response = await fetch("http://localhost:8000/api/tags?_limit=150")
    
        if (!response.ok) {
            throw new Error('Error al buscar los tags')
        }
        // Obtengo los datos de la respuesta
        const data = await response.json()
    
        return data;
        
    } catch (error) {
        throw new Error("Error al buscar los tags")        
    }


}

export async function getTag(tag) {

    try {
        const response = await fetch(`http://localhost:8000/api/tags?tag=${tag}`)
    
        if (!response.ok) {
            throw new Error('Error al buscar el tag')
        }
        // Obtengo los datos de la respuesta
        const data = await response.json()
    
        return data        
    } catch (error) {
        throw new Error("Error al buscar el tags")  
        
    }


}

function isFinalPage(totalCount,limit,page){    
    
    try {
        const totalPages = totalCount/limit
        if(page >= totalPages){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        throw new Error("No se puede obtener la última página")        
    }

}