let listaDeDivisas = [];
let fechaInicial = document.querySelector("#fecha-inicial");
let fechaFinal = document.querySelector("#fecha-final");
const botonConvertir = document.getElementById("convertir");
const listaDelPrimerDia = document.querySelector("#dia-inicial");
const listaDelSegundoDia = document.querySelector("#dia-final");
const fluctuacionDeValor = document.querySelector("#cambio-de-valor");
const $mainContainer = document.getElementById("contenedor-principal");

function imprimirMonedas(respuestaJSON) {
  const monedas = respuestaJSON.symbols;
  for (const divisas in monedas) {
    listaDeDivisas.push(divisas);
  }
  crearOpcionesDeDivisas();
}

function crearOpcionesDeDivisas() {
  const selector = document.querySelector("#selector-de-divisas");
  listaDeDivisas.forEach(function ($divisa) {
    const opcionesDeDivisas = document.createElement("option");
    opcionesDeDivisas.value = $divisa;
    opcionesDeDivisas.textContent = $divisa;
    selector.appendChild(opcionesDeDivisas);
  });
}

fechaInicial.addEventListener("change", function () {
  desbloquearFechaFinal();
  fechaFinal.min = fechaInicial.value;
});

fechaFinal.addEventListener("change", function () {
  fechaInicial.max = fechaFinal.value;
  botonConvertir.disabled = false;
});

function desbloquearFechaFinal() {
  if (fechaInicial.value !== 0) {
    fechaFinal.disabled = false;
  }
}

function obtenerOpcionesDelSelect() {
  let select = document.querySelector("#selector-de-divisas");
  let opciones = [];
  for (let i = 0; i < select.options.length; i++) {
    opciones.push(select.options[i].value);
  }
  return opciones;
}

let listadoDeDivisas = obtenerOpcionesDelSelect();
botonConvertir.onclick = function (event) {
  let cantidadAConvertir = document.querySelector("#cantidad-de-dinero");
  let divisaElegida = document.querySelector("#selector-de-divisas");
  cargarHistorialDeCambios(
    Number(cantidadAConvertir.value),
    divisaElegida.value,
    listadoDeDivisas,
    fechaInicial.value,
    fechaFinal.value
  );
  event.preventDefault();
};

function obtenerPrimerUltimoValor(objetoJSON) {
  const rates = objetoJSON.rates;
  const fechas = Object.keys(rates);
  const primerFecha = fechas[0];
  const ultimaFecha = fechas[fechas.length - 1];
  const primerValor = rates[primerFecha];
  const ultimoValor = rates[ultimaFecha];

  crearListaDeDivisas(primerValor, ultimoValor) 
  // compararValores(primerValor, ultimoValor);
}

function crearListaDeValores(primerValor, ultimoValor) {
  const filaDeDivisas = document.createElement("div");
  
  for (const divisaInicial in primerValor) {
    const precio = primerValor[divisaInicial];
    const h2 = document.createElement("h2");
    h2.textContent = `${divisaInicial}: ${precio}`;
    h2.classList.add("primerValor");
    filaDeDivisas.appendChild(h2);
  }
  for (const divisaFinal in ultimoValor) {
    const precio = ultimoValor[divisaFinal];
    const h2 = document.createElement("h2");
    h2.textContent = `${divisaFinal}: ${precio}`;
    h2.classList.add("ultimoValor");
    filaDeDivisas.appendChild(h2);
  }
  const mainContainer = document.querySelector(".main-container");
  mainContainer.appendChild(filaDeDivisas);
}

function crearListaDeDivisas(primerValor, ultimoValor){
    $mainContainer.innerHTML += `
    <div class="filaDeDivisas"> <div class="primera-fecha"></div> <div class="cambioDePrecios"></div> <div class="segunda-fecha"></div> </div>`
    for(const divisaInicial in primerValor){
      const precio = primerValor[divisaInicial];
      const h2 = document.createElement("h2");
      h2.textContent = `${divisaInicial}: ${precio}`;
      h2.classList.add("ultimoValor");
      document.querySelector(".primera-fecha").appendChild(h2);
    }
    for(const divisaFinal in ultimoValor){
      const precio = ultimoValor[divisaFinal];
      const h2 = document.createElement("h2");
      h2.textContent = `${divisaFinal}: ${precio}`;
      h2.classList.add("ultimoValor");
      document.querySelector(".segunda-fecha").appendChild(h2);
    }
}



function compararValores(primerValor, ultimoValor) {
  for (const cambioDeValor in primerValor && ultimoValor) {
    const precioInicial = primerValor[cambioDeValor];
    const precioFinal = ultimoValor[cambioDeValor];
    const porcentajeDeCambio =
      ((precioFinal - precioInicial) / precioInicial) * 100;
    const porcentajeReducido = porcentajeDeCambio.toFixed(2);
    const h2 = document.createElement("h2");
    if(porcentajeReducido >0){
      h2.classList.add("subio")
    } else if(porcentajeDeCambio < 0){
      h2.classList.add("bajo")
    } else{
      h2.classList.add("igual-valor")
    }
    h2.textContent = `${porcentajeReducido}%`;
    fluctuacionDeValor.appendChild(h2);
  }
}
