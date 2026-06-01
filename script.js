document.getElementById("umowBtn").addEventListener("click", function(){
    document.getElementById("rezerwacja").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("formularz").addEventListener("submit", function(e){
    e.preventDefault();

    const imie = document.getElementById("imie").value;
    const data = document.getElementById("data").value;
    const godzina = document.getElementById("godzina").value;

    document.getElementById("komunikat").innerHTML =
        `Dziękujemy ${imie}! Twoja wizyta została wybrana na ${data} o ${godzina}.`;
});
