const toggleMode = document.querySelector("#toggle-mode");

if (localStorage.getItem("theme")) {
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("theme"),
  );
}
toggleMode.addEventListener("input", () => {
  if (toggleMode.checked) {
    document.documentElement.setAttribute("data-theme", "dracula");
  } else {
    document.documentElement.setAttribute("data-theme", "winter");
  }
  localStorage.setItem(
    "theme",
    document.documentElement.getAttribute("data-theme"),
  );
});
