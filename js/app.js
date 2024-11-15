import "./mode.js";
import request from "./request.js";
import { updateHomeUI } from "./updateUI.js";
import loader from "./loader.js";

loader(true);

setTimeout(() => {
  loader(false);
}, 1000);

fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    if (data.products) {
      updateHomeUI(data);
    } else {
      console.error("Data yoki products mavjud emas");
    }
  })
  .catch((error) => {
    console.error("Xato yuz berdi:", error);
  });
