let listaDeDivisas = [];
let fechaInicial = document.querySelector("#fecha-inicial");
let fechaFinal = document.querySelector("#fecha-final");
let cantidadAConvertir = document.querySelector("#cantidad-de-dinero");
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
botonConvertir.onclick = function () {
  validarFormularioMontos();
  validarFormularioFechas();  
  borrarConversionAnterior();
  if(hayErrorMontos || hayErrorPrimeraFecha || hayErrorSegundaFecha){
    return;
  }
  let divisaElegida = document.querySelector("#selector-de-divisas");
  cargarHistorialDeCambios(
    Number(cantidadAConvertir.value),
    divisaElegida.value,
    listadoDeDivisas,
    fechaInicial.value,
    fechaFinal.value
  );
};


function obtenerPrimerUltimoValor(objetoJSON) {
  const rates = objetoJSON.rates;
  const fechas = Object.keys(rates);
  const primerFecha = fechas[0];
  const ultimaFecha = fechas[fechas.length - 1];
  const primerValor = rates[primerFecha];
  const ultimoValor = rates[ultimaFecha];

  crearListaDeValores(primerValor, ultimoValor) 
  compararValores(primerValor, ultimoValor);
}

function crearListaDeValores(primerValor, ultimoValor) {
  listaDelPrimerDia.innerHTML = "";
  listaDelSegundoDia.innerHTML = "";
  for (const divisaInicial in primerValor) {
    const precio = primerValor[divisaInicial];
    const h3 = document.createElement("h3");
    h3.textContent = `${divisaInicial}: ${precio}`;
    h3.classList.add(`precios`);
    listaDelPrimerDia.appendChild(h3);
  }
  for (const divisaFinal in ultimoValor) {
    const precio = ultimoValor[divisaFinal];
    const h3 = document.createElement("h3");
    h3.textContent = `${divisaFinal}: ${precio}`;
    h3.classList.add(`precios`);
    listaDelSegundoDia.appendChild(h3);
  }
}
function compararValores(primerValor, ultimoValor) {
  fluctuacionDeValor.innerHTML = "";
  for (const cambioDeValor in primerValor && ultimoValor) {
    const precioInicial = primerValor[cambioDeValor];
    const precioFinal = ultimoValor[cambioDeValor];
    const porcentajeDeCambio =
      ((precioFinal - precioInicial) / precioInicial) * 100;
    const porcentajeReducido = porcentajeDeCambio.toFixed(2);
    const h3 = document.createElement("h3");
    if(porcentajeReducido >0){
      h3.classList.add("subio")
    } else if(porcentajeReducido < 0){
      h3.classList.add("bajo")
    } else{
      h3.classList.add("igual-valor")
    }
    h3.textContent = `${porcentajeReducido}%`;
    fluctuacionDeValor.appendChild(h3);
  }}
function borrarConversionAnterior(){
  listaDelPrimerDia.innerHTML = "";
  listaDelSegundoDia.innerHTML = "";
  fluctuacionDeValor.innerHTML = "";
}