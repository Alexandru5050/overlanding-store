import { getAllProducts } from "./api/products.js";
import { mapProductToCard } from "./utils/layout.js";

document.addEventListener("DOMContentLoaded", dispalyAllProducts);
const mainContainer = document.querySelector(".main");

async function dispalyAllProducts() {
  const products = await getAllProducts();

  mainContainer.innerHTML = products.map(mapProductToCard).join("");

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
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
  });
}
var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 6000); 
}