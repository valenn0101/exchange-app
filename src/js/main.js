let listaDeDivisas = [];
let fechaInicial = document.querySelector("#fecha-inicial");
let fechaFinal = document.querySelector("#fecha-final");
const botonConvertir = document.getElementById("convertir");
const listaDelPrimerDia = document.querySelector("#dia-inicial");
const listaDelSegundoDia = document.querySelector("#dia-final");
const fluctuacionDeValor = document.querySelector("#cambio-de-valor");

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

  crearListaDeValores(primerValor, ultimoValor);
  compararValores(primerValor, ultimoValor);
}

function crearListaDeValores(primerValor, ultimoValor) {
  let i = 1;

  for (const divisaInicial in primerValor) {
    const precio = primerValor[divisaInicial];
    const h1 = document.createElement("h1");
    h1.textContent = `${divisaInicial}: ${precio}`;
    h1.classList.add(`precio${i}`);
    listaDelPrimerDia.appendChild(h1);
    i++;
  }
  let ii= 1
  for (const divisaFinal in ultimoValor) {
    const precio = ultimoValor[divisaFinal];
    const h1 = document.createElement("h1");
    h1.textContent = `${divisaFinal}: ${precio}`;
    h1.classList.add(`precio${ii}`);
    listaDelSegundoDia.appendChild(h1);
    i++;
  }
}
function compararValores(primerValor, ultimoValor) {
  for (const cambioDeValor in primerValor) {
    const precioInicial = primerValor[cambioDeValor];
    const precioFinal = ultimoValor[cambioDeValor];
    const porcentajeDeCambio =
      ((precioFinal - precioInicial) / precioInicial) * 100;
    const porcentajeReducido = porcentajeDeCambio.toFixed(2);
    const h2 = document.createElement("h2");
    h2.textContent = `${porcentajeReducido}%`;
    fluctuacionDeValor.appendChild(h2);
  }
}
