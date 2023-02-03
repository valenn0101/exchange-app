let listadoDeDivisas = [];
let cantidadDeDinero = document.getElementById("cantidad-de-dinero").value;
const fechaPredeterminada = new Date().toLocaleDateString();
let fechaElegida = document.getElementById("fecha").value;
let divisaElegida = document.getElementById("selector-de-divisas");
const botonConvertir = document.getElementById("convertir");

function imprimirMonedas(respuestaJSON){
  const monedas = respuestaJSON.symbols;
  let listaDeDivisas = [];
  for(const divisas in monedas){
    listaDeDivisas.push(divisas);
    listadoDeDivisas.push(divisas);
  }
  const selector = document.querySelector("#selector-de-divisas");

  listadoDeDivisas.forEach(function($divisa) {
    const opcionesDeDivisas = document.createElement("option");
    opcionesDeDivisas.value = $divisa;
    opcionesDeDivisas.textContent = $divisa;
    selector.appendChild(opcionesDeDivisas);
});
return listaDeDivisas;
}
