let localProducts = JSON.parse(localStorage.getItem("products")) || [];
const basket = document.getElementById("basket");

const calculateTotal = () => {
  let totalAmount = 0;
  let totalPrice = 0;
  localProducts = JSON.parse(localStorage.getItem("products")) || [];
  localProducts.forEach((product) => {
    totalAmount += product.amount;
    totalPrice += product.amount * product.price;
  });
  basket.textContent = totalAmount;
};

if (localProducts.lengtht) {
  calculateTotal();
}

import { toast } from "./toast.js";

export const addProduct = (product) => {
  localProducts = JSON.parse(localStorage.getItem("products")) || [];
  const item = localProducts.find((prod) => prod.id == product.id);

  if (!item) {
    const updatedProducts = [...localProducts, product];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    calculateTotal();
    localProducts = updatedProducts;
    toast("success", "🎉 You just added a shiny new item to your cart! 🛒");
  } else {
    toast(
      "warning",
      "Oops! 🤭 You've already added this gem to your cart. No more room! 😜",
    );
  }
};

export const deleteElement = (e) => {
  const id = e.target.dataset.id;
  localProducts = localProducts.filter((product) => product.id != id);
  localStorage.setItem("products", JSON.stringify(updatedProducts));
  calculateTotal();
};
