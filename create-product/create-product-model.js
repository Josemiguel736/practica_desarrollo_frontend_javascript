
export function createProduct(name,description,image,typeProduct,price, token){

    fetch("http://localhost:8000/api/products",{
        method:"POST",
        //mando los parametros por el body TIENEN QUE SER STRING por eso el metodo stringfy
        body:JSON.stringify({
            name,
            description,
            image,
            typeProduct,
            price
        }),
        //envio la cabecera, en este caso es una request header
        headers:{
            //decimos en la cabecera que el archivo que enviamos es un JSON
            "Content-type":"application/json",
            "Authorization": `Bearer ${token} `
        }
    });
}