import { getProductById } from "../api/products.js";

document.addEventListener ('DOMContentLoaded',  ()=> {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalContainer = document.querySelector('.cart-total');
    const productCard = document.querySelector('#productTable tbody');
// console.log(cart);

    function updateCart() {
        productCard.innerHTML = "";
        let total = 0;

        for (let id in cart) {
           
            const product = cart[id];
           
            const row = document.createElement('tr');

                row.innerHTML =   `
            
                <td><img width="20px" src="${product.imageUrl}"/></td>
                <td>${product.name}</td>
                <td><button data-id=${id} class="decrease">-</button></td>
                <td>${product.quantity}</td>
                <td><button data-id=${id} class="increase">+</button></td>
                <td><span>${product.price} lei</span></td>
    
    `;
    productCard.appendChild(row);

            ;
        
            total = total + product.price * product.quantity;
            cartTotalContainer.innerHTML = `Total: ${total} LEI`;
                   
        }

    }

    cartItemsContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('increase')) {
            const id = e.target.getAttribute('data-id');
            cart[id].quantity += 1;
        } else if( e.target.classList.contains('decrease')){
            const id = e.target.getAttribute('data-id');
            cart[id].quantity -= 1;
            if(cart[id].quantity <= 0) {
                delete cart[id];
            }
       }
       localStorage.setItem('cart',JSON.stringify(cart));
       updateCart();
    })
     updateCart();
});



