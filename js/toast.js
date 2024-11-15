export const toast = (status, massage, position = ["top", "right"]) => {
  if (status == "success") {
    Toastify({
      text: massage,
      duration: 3000,
      close: true,
      gravity: "top", // Position at the top
      position: "right", // Align to the left
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #ffc107, #ffb300)", // Green gradient
      },
    }).showToast();
  } else {
    Toastify({
      text: massage,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #28a745, #218838)", // Yellow gradient for warning
      },
    }).showToast();
  }
};
