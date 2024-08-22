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
                <td><button data-id=${id} ${product.quantity === 1 ? 'disabled' : '' }
                 class="decrease">-</button></td>
                <td>${product.quantity}</td>
                <td><button data-id=${id} class="increase">+</button></td>
                <td><span>${product.price} lei</span></td>
                <td><span>${product.price * product.quantity} lei</span></td>
                <td><button data-id=${id} class="delete">Sterge</button></td>

    
    `;
    productCard.appendChild(row);

            ;
        
            total = total + product.price * product.quantity;
                   
        }
        cartTotalContainer.innerHTML = total === 0 ? 'Cosul de cumparaturi este gol' : 
        `Total cos cumparaturi: ${total} LEI`;


    }

    cartItemsContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('increase')) {
            const id = e.target.getAttribute('data-id');
            cart[id].quantity += 1;
        } else if( e.target.classList.contains('decrease')){
            const id = e.target.getAttribute('data-id');
            cart[id].quantity -= 1;
                        
        }else if( e.target.classList.contains('delete')) {
            const id = e.target.getAttribute('data-id');
            delete cart[id];
        }
       localStorage.setItem('cart',JSON.stringify(cart));
       updateCart();
    })
     updateCart();
});



