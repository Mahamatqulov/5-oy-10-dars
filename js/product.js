import "./mode.js";
import request from "./request.js";

const titleEl = document.getElementById("title");
const thumbnailEl = document.getElementById("thumbnail");
const brandEl = document.querySelector(".brand");
const priceEl = document.querySelector(".price");
const ratingEl = document.querySelector(".rating");
const descriptionEl = document.querySelector(".description");
const discountPercentageEl = document.querySelector(".discountPercentage");

const location = window.location.search;
const params = new URLSearchParams(location).get("id");

if (params) {
  request(`https://dummyjson.com/products/${params}`)
    .then((product) => {
      titleEl.textContent = product.title;
      thumbnailEl.src = product.thumbnail;
      brandEl.textContent = product.brand;
      ratingEl.textContent = `⭐${product.rating}`;
      priceEl.textContent = `$${product.price}`;
      descriptionEl.textContent = product.description;
      discountPercentageEl.textContent = `$${product.discountPercentage}`;
    })
    .catch((error) => console.log("Error:", error.message));
}
