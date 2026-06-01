const umowBtn = document.getElementById("umowBtn");
const formularz = document.getElementById("formularz");
const komunikat = document.getElementById("komunikat");

umowBtn.addEventListener("click", () => {
  document.getElementById("rezerwacja").scrollIntoView({
    behavior: "smooth"
  });
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
