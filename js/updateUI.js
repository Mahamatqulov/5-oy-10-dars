import { addProduct } from "./productLocal.js";
import { formatNumber } from "./formater.js";
import { deleteElement } from "./productLocal.js";

const homeCardTemplate = document.getElementById("home-card-template");
const productsContainer = document.getElementById("products-container");
const trTemplate = document.getElementById("tr-template");
const tbody = document.querySelector("tbody");

let allProducts = [];

const stopNavigation = (e) => {
  e.preventDefault();
  const id = e.target.dataset.id;
  const item = allProducts.find((product) => product.id == id);
  addProduct({ ...item, amount: 1 });
};

export const updateHomeUI = ({ products }) => {
  allProducts = products;
  products.forEach((product) => {
    const {
      thumbnail,
      title,
      rating,
      date,
      brand,
      id,
      price,
      discountPercentage,
    } = product;
    const clone = homeCardTemplate.content.cloneNode(true);
    const img = clone.querySelector("img");
    const productBrand = clone.querySelector("p");
    const productsTitle = clone.querySelector("h2");
    const productRating = clone.querySelector("h3");
    const productDate = clone.querySelector("h5");
    const productA = clone.querySelector("a");
    const button = clone.querySelector("button");
    const productPrice = clone.querySelector("h6");
    const productDiscountPercentage = clone.querySelector("span");

    productA.href = `./product.html?id=${id}`;
    img.src = thumbnail;
    productDiscountPercentage.textContent = `$${discountPercentage}`;
    productPrice.textContent = `$${price}`;
    productBrand.textContent = brand;
    productDate.textContent = date;
    productsTitle.textContent = title;
    productRating.textContent = rating;
    button.setAttribute("data-id", id);
    button.addEventListener("click", stopNavigation);
    productsContainer.appendChild(clone);
  });
};

export const updateTbodyUI = (products) => {
  tbody.innerHTML = "";
  products.forEach((product) => {
    const { id, thumbnail, price, amount, brand, title, discountPercentage } =
      product;
    const clone = trTemplate.content.cloneNode(true);
    const image = clone.querySelector("img");
    const brandEl = clone.querySelector(".brand");
    const priceEl = clone.querySelector(".price");
    const titleEl = clone.querySelector(".title");
    const amountInput = clone.querySelector(".amount");
    image.src = thumbnail;
    titleEl.textContent = title;
    brandEl.textContent = `Brand: ${brand}`;
    amountInput.value = amount;
    const totalPrice = (price / 10) * 7.59 * amount;
    priceEl.textContent = `${formatNumber(totalPrice)} `;

    amountInput.addEventListener("input", (e) => {
      const newAmount = parseInt(e.target.value);
      if (newAmount >= 0) {
        const newTotalPrice = (price / 10) * 7.59 * newAmount;
        priceEl.textContent = `${formatNumber(newTotalPrice)} `;

        saveToLocalStorage(id, newAmount);

        if (newAmount === 0) {
          deleteProduct(id);
        }
      }
    });

    const increaseButton = clone.querySelector(".btn:nth-child(1)");
    increaseButton.addEventListener("click", () => {
      let currentAmount = parseInt(amountInput.value);
      amountInput.value = currentAmount + 1;

      const newTotalPrice = (price / 10) * 7.59 * amountInput.value;
      priceEl.textContent = `${formatNumber(newTotalPrice)} `;

      saveToLocalStorage(id, amountInput.value);
    });

    const decreaseButton = clone.querySelector(".btn:nth-child(3)");
    decreaseButton.addEventListener("click", () => {
      let currentAmount = parseInt(amountInput.value);
      if (currentAmount > 0) {
        amountInput.value = currentAmount - 1;

        const newTotalPrice = (price / 100) * 7.59 * amountInput.value;
        priceEl.textContent = `${formatNumber(newTotalPrice)} `;

        saveToLocalStorage(id, amountInput.value);

        if (amountInput.value == 0) {
          deleteProduct(id);
        }
      }
    });

    const deleteButton = clone.querySelector(".btn-outline");
    deleteButton.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      row.remove();
      deleteProduct(id);
    });

    tbody.appendChild(clone);
  });
};

const saveToLocalStorage = (productId, amount) => {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const productIndex = products.findIndex(
    (product) => product.id === productId,
  );
  if (productIndex > -1) {
    products[productIndex].amount = amount;
    localStorage.setItem("products", JSON.stringify(products));
  }
};

const deleteProduct = (productId) => {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter((product) => product.id !== productId);
  localStorage.setItem("products", JSON.stringify(products));
  updateTbodyUI(products);
};

window.addEventListener("load", () => {
  const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
  updateHomeUI({ products: savedProducts });
  updateTbodyUI(savedProducts);
});
