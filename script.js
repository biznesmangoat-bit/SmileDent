const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const openButtons = document.querySelectorAll(".open-modal");

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
