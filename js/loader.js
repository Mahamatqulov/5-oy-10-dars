const loaderEl = document.getElementById("loader");
const loader = (state) => {
  if (state) {
    loaderEl.classList.remove("hidden");
  } else {
    loaderEl.classList.add("hidden");
  }
};
export default loader;
