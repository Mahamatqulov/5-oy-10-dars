import "./mode.js";
import { toast } from "./toast.js";
import { updateTbodyUI } from "./updateUI.js";

const localProducts = JSON.parse(localStorage.getItem("products"));

if (!localProducts) {
  toast("warning", "Oops, you don't have any products yet :(", [
    "bottom",
    "center",
  ]);
} else {
  updateTbodyUI(localProducts);
}

function increaseAmount() {
  const input = document.getElementById("amountInput");
  input.value = parseInt(input.value) + 1;
}

function decreaseAmount() {
  const input = document.getElementById("amountInput");
  if (input.value > 0) {
    input.value = parseInt(input.value) - 1;
  }
}
const calculateTotalPrice = (products) => {
  return products.reduce((total, product) => {
    const { price, amount } = product;
    return total + (price / 10) * 7.59 * amount;
  }, 0);
};

const updateTotalPriceInLocalStorage = (products) => {
  const totalPrice = calculateTotalPrice(products);

  localStorage.setItem("totalPrice", totalPrice);
};

const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
updateTotalPriceInLocalStorage(savedProducts);

const totalPriceElement = document.getElementById("total-price");
const savedTotalPrice = localStorage.getItem("totalPrice");

if (totalPriceElement && savedTotalPrice !== null) {
  totalPriceElement.textContent = `Umumiy narx: $${savedTotalPrice}`;
}
