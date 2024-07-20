const productsTableBody = document.getElementById('products-table').querySelector('tbody');
console.log(productsTableBody);


document.addEventListener('DOMContentLoaded', displayAllProducts);

function getAllProducts() {
    const url = "https://668d7a51099db4c579f3177f.mockapi.io/products";
    return fetch(url).then(response => response.json());
}


function displayAllProducts() {
    getAllProducts().then(products => {
    productsTableBody.innerHTML = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <img src=${product.imageUrl}
                width="50px" />
            <td>
                <button>
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </td>
              <td>
                <button>
                   <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    )
            .join('');
    })

}
