import { getAllProducts } from "../api/products.js";
import { getProductById } from "../api/products.js";
import { mapProductToAdminTableRow } from "../utils/layout.js";
import { updateProduct } from "../api/products.js";
import { addNewProduct } from "../api/products.js";


//load products in table at page loading
const productsTableBody = document.getElementById('products-table').querySelector('tbody');
console.log(productsTableBody);


document.addEventListener('DOMContentLoaded', displayAllProducts);



async function displayAllProducts() {
    const products = await getAllProducts();

    productsTableBody.innerHTML = products.map(mapProductToAdminTableRow).join('');
    }


//save new product
const form = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageUrlInput = document.getElementById('image-url');
const detailsInput = document.getElementById('details');
const saveProductButton = document.getElementById('save-btn');
let editMode = false;
let currentEditableProductId;
saveProductButton.addEventListener('click', saveProduct);



async function saveProduct(event) {

    event.preventDefault();
    
        const product = {
            name: nameInput.value,
            price: Number(priceInput.value),
            imageUrl: imageUrlInput.value,
            details: detailsInput.value,
        };
        
        if(editMode) {
            const editedProduct = await updateProduct(product, currentEditableProductId);
            if(editProduct !== null) {
                form.reset();
                displayAllProducts();
                editMode = false;
            }
        }else {
            const newProduct = await addNewProduct(product);
            if(newProduct !== null) {
                form.reset();
                displayAllProducts();
            }
        }
    


}

//edit product

productsTableBody.addEventListener('click', handleActions);

function handleActions(event) {
   
    const className = event.target.parentElement.className;
    if(className.includes('edit')) {
        const productId = className.split('-')[1];
        editProduct(productId);
    }else if(className.includes('delete')){
        const productId = className.split("-")[1];
        deleteProduct(productId);
    }
}

function editProduct(id) {
    getProductById(id).then((product) => 
    {
        editMode = true;
        nameInput.value = product.name;
        priceInput.value = product.price;
        imageUrlInput.value = product.imageUrl;
        detailsInput.value = product.details;


        currentEditableProductId = product.id;
    }
    );
}

function deleteProduct(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        
    }).then(() => {
        displayAllProducts();
    });
}