
const listaDePrueba = [
    { symbol: "USD", name: "Dolar Estadounidense" },
    { symbol: "EUR", name: "Euro" },
    { symbol: "GBP", name: "Libra" },
    { symbol: "JPY", name: "Yenes" },
];
function procesarSimbolos(simbolos) {
    Object.keys(simbolos).forEach(function(clave) {
      const valor = simbolos[clave];
      console.log(`description: ${valor.description}, code: ${valor.code}`);
    });
  }

const selector = document.querySelector("#selector-de-divisas");

listaDePrueba.forEach(function(currency) {
    const option = document.createElement("option");
    option.value = currency.symbol;
    option.textContent = currency.name;
    selector.appendChild(option);
});
obtenerDivisas()


const today = new Date().toLocaleDateString();
document.querySelector("#fecha").setAttribute("max", today);