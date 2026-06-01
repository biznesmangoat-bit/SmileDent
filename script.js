const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const formularz = document.getElementById("formularz");
const komunikat = document.getElementById("komunikat");
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

formularz.addEventListener("submit", (e) => {
  e.preventDefault();

  const imie = document.getElementById("imie").value;
  const data = document.getElementById("data").value;
  const godzina = document.getElementById("godzina").value;

  komunikat.style.display = "block";
  komunikat.textContent =
    `Dziękujemy, ${imie}! Wybrany termin: ${data}, godzina ${godzina}.`;
});
