let listadoDeDivisas = []; 
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

botonConvertir.onclick = function(event){
  let cantidadAConvertir = document.querySelector("#cantidad-de-dinero");
  let divisaElegida = document.querySelector("#selector-de-divisas");
 // const fechaPredeterminada = new Date().toLocaleDateString();
  let fechaElegida = document.querySelector("#fecha");
  divisasTotales = "USD, YEN, AUD, ARS";
  cargarHistorialDeCambios(Number(cantidadAConvertir.value), divisaElegida.value, 'EUR,CZK' ,fechaElegida.value , '2023-02-03');
  event.preventDefault();
}
