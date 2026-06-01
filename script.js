const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const formularz = document.getElementById("formularz");
const komunikat = document.getElementById("komunikat");
const openButtons = document.querySelectorAll(".open-modal");
const dataInput = document.getElementById("data");
const godzinyBox = document.getElementById("godziny");
const listaWizyt = document.getElementById("listaWizyt");

const godziny = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];

let wybranaGodzina = "";
let wizyty = JSON.parse(localStorage.getItem("wizyty")) || [];

openButtons.forEach(button => {
  button.addEventListener("click", () => {
    modal.classList.add("active");
    pokazGodziny();
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("active");
});

dataInput.addEventListener("change", () => {
  wybranaGodzina = "";
  pokazGodziny();
});

function pokazGodziny() {
  godzinyBox.innerHTML = "";

  const wybranaData = dataInput.value;

  if (!wybranaData) {
    godzinyBox.innerHTML = "<p>Najpierw wybierz datę.</p>";
    return;
  }

  godziny.forEach(godzina => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = godzina;
    btn.className = "godzina";

    const zajeta = wizyty.some(w =>
      w.data === wybranaData && w.godzina === godzina
    );

    if (zajeta) {
      btn.classList.add("zajeta");
      btn.disabled = true;
      btn.textContent = godzina + " zajęte";
    }

    if (godzina === wybranaGodzina) {
      btn.classList.add("aktywna");
    }

    btn.addEventListener("click", () => {
      if (zajeta) return;
      wybranaGodzina = godzina;
      pokazGodziny();
    });

    godzinyBox.appendChild(btn);
  });
}

formularz.addEventListener("submit", e => {
  e.preventDefault();

  const imie = document.getElementById("imie").value;
  const usluga = document.getElementById("usluga").value;
  const data = document.getElementById("data").value;

  if (!data) {
    alert("Wybierz datę.");
    return;
  }

  if (!wybranaGodzina) {
    alert("Wybierz godzinę.");
    return;
  }

  const czyJuzZajeta = wizyty.some(w =>
    w.data === data && w.godzina === wybranaGodzina
  );

  if (czyJuzZajeta) {
    alert("Ten termin jest już zajęty.");
    pokazGodziny();
    return;
  }

  wizyty.push({
    imie,
    usluga,
    data,
    godzina: wybranaGodzina
  });

  localStorage.setItem("wizyty", JSON.stringify(wizyty));

  komunikat.style.display = "block";
  komunikat.textContent =
    `Zarezerwowano: ${imie}, ${usluga}, ${data}, godzina ${wybranaGodzina}.`;

  wybranaGodzina = "";
  pokazGodziny();
  pokazWizyty();
});

function pokazWizyty() {
  listaWizyt.innerHTML = "";

  if (wizyty.length === 0) {
    listaWizyt.innerHTML = "<p>Brak zapisanych wizyt.</p>";
    return;
  }

  wizyty.forEach((wizyta, index) => {
    const div = document.createElement("div");
    div.classList.add("wizyta");

    div.innerHTML = `
      <div>
        <strong>${wizyta.imie}</strong><br>
        ${wizyta.usluga}<br>
        ${wizyta.data}, godz. ${wizyta.godzina}
      </div>
      <button class="usun" data-index="${index}">Usuń</button>
    `;

    listaWizyt.appendChild(div);
  });

  document.querySelectorAll(".usun").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      wizyty.splice(index, 1);
      localStorage.setItem("wizyty", JSON.stringify(wizyty));
      pokazWizyty();
      pokazGodziny();
    });
  });
}

pokazWizyty();
pokazGodziny();
