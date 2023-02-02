const listaDePrueba = [
    { symbol: "USD", name: "Dolar Estadounidense" },
    { symbol: "EUR", name: "Euro" },
    { symbol: "GBP", name: "Libra" },
    { symbol: "JPY", name: "Yenes" },
    // agrega más aquí si es necesario
];

const selector = document.querySelector("#selector-de-divisas");

listaDePrueba.forEach(function(currency) {
    const option = document.createElement("option");
    option.value = currency.symbol;
    option.textContent = currency.name;
    selector.appendChild(option);
});
const today = new Date().toLocaleDateString();
document.querySelector("#fecha").setAttribute("max", today);