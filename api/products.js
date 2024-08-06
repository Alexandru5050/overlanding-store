const url = "https://668d7a51099db4c579f3177f.mockapi.io/products";



export async function getAllProducts() {
    const response = await fetch (url);
    const products = await response.json();


    return products;
}


export async function getProductById(id) {
   const response = await fetch(`${url}/${id}`);
   const product = await response.json();

   return product;
}

export async function addNewProduct(product) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    const newProduct = await response.json();
    return newProduct;
}
export async function updateProduct(product, productId) {
    const response = await fetch(`${url}/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    const editedProduct = await response.json();
    return editedProduct;
}

 export async function deleteProduct(id) {
    await fetch(`${url}/${id}`, {
        method: 'DELETE',
        

    });
}
