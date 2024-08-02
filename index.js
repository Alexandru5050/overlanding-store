import { getAllProducts } from "./api/products.js";
import { mapProductToCard } from "./utils/layout.js";

document.addEventListener("DOMContentLoaded", dispalyAllProducts);
const mainContainer = document.querySelector(".main");

async function dispalyAllProducts() {
  const products = await getAllProducts();

  mainContainer.innerHTML = products.map(mapProductToCard).join("");
}
