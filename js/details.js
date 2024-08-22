document.addEventListener('DOMContentLoaded', showProductDetails);

const url = "https://668d7a51099db4c579f3177f.mockapi.io/products";


async function showProductDetails() {
    const urlSearchParam = new URLSearchParams(window.location.search);
    const productId = urlSearchParam.get('id');


    const response = await fetch(`${url}/${productId}`);
    const product = await response.json();

    console.log(product);

    document.querySelector('.main').innerHTML = 
    `<h2>${product.details}</h2>
    <div class="detailsContent">
    <img src=${product.imageUrl} width="350px"/>
    <div class="priceAndButton">
    <h4>Pret: ${product.price} lei</h4>
    <button class="add-to-cart"  data-id=${product.id} data-name=${product.name} 
    data-price=${product.price} data-image=${product.imageUrl}>Adauga in cos</button>
    </div>
    </div>
    `
const button = document.querySelector(".add-to-cart");


  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-id");
    const price = button.getAttribute("data-price");
    const name = button.getAttribute("data-name");
    const imageUrl = button.getAttribute("data-image");

    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[productId]) {
      cart[productId].quantity += 1;
    } else {
      cart[productId] = { quantity: 1 };
      cart[productId] = {
        quantity: 1,
        price: price,
        name: name,
        imageUrl: imageUrl,
      };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  });
} 

