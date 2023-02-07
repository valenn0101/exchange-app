function validarMontos(dineroIngresado) {
  dineroIngresado = parseFloat(dineroIngresado);
  if (isNaN(dineroIngresado)) {
    return "El campo de montos no puede estar vacio.";
  }
  if (dineroIngresado === 0) {
    return "El campo de montos no puede ser igual a cero.";
  }
  if (dineroIngresado < 0) {
    return "El campo montos no puede ser un numero negativo.";
  }
  return "";
}


function validarPrimeraFecha(primeraFecha) {
    let fechaInicial = new Date(primeraFecha);
    let fechaActual = new Date();
    let fechaUnAnioAntes = new Date(fechaActual);
    fechaUnAnioAntes.setFullYear(fechaActual.getFullYear() - 1);
  
    if (fechaInicial < fechaUnAnioAntes) {
      return "La primera fecha no puede ser menor a 365 dias del dia de hoy.";
    }
    return "";
  }
  

function validarSegundaFecha(segundaFecha) {
  let fechaFinal = new Date(segundaFecha);
  let fechaActual = new Date();

  if (fechaFinal > fechaActual) {
    return "La fecha final no puede ser mayor al dia de hoy.";
  }
  return "";
}

function validarFormularioMontos() {
  let dineroIngresado = document.querySelector("#cantidad-de-dinero").value;
  const erroresMontos = validarMontos(dineroIngresado);

  const $erroresMontos = {
    montos: erroresMontos,
  };
  manejarErroresMontos($erroresMontos);
}

function validarFormularioFechas() {
    let primeraFecha = document.querySelector("#fecha-inicial").value;
    let segundaFecha = document.querySelector("#fecha-final").value;  
  const erroresPrimeraFecha = validarPrimeraFecha(primeraFecha);
  const erroresSegundaFecha = validarSegundaFecha(segundaFecha);

  const $erroresPrimeraFecha = {
    fecha: erroresPrimeraFecha,
  };
  const $erroresSegundaFecha = {
    fecha: erroresSegundaFecha,
  };
  manejarErroresPrimeraFecha($erroresPrimeraFecha);
  manejarErroresSegundaFecha($erroresSegundaFecha);
}

let hayErrorMontos;

function manejarErroresMontos($erroresMontos) {
  const inputMontos = document.querySelector("#cantidad-de-dinero");
  const $errores = document.querySelector("#erroresMontos");
  $errores.innerHTML = "";
  Object.values($erroresMontos).forEach((error) => {
    if (error) {
      inputMontos.classList.add("error");
      const $error = document.createElement("li");
      $error.innerText = error;
      $error.classList.add("alert");
      $error.classList.add("alert-danger");
      $errores.appendChild($error);
      hayErrorMontos = true;
    } else {
      inputMontos.classList.remove("error");
      hayErrorMontos = false;
    }
  });
}

let hayErrorPrimeraFecha;

function manejarErroresPrimeraFecha($erroresPrimeraFecha) {
  let primeraFechaInput = document.querySelector("#fecha-inicial");
  const $errores = document.querySelector("#errores-primera-fecha");
  $errores.innerHTML = "";
  Object.values($erroresPrimeraFecha).forEach((error) => {
    if (error) {
      primeraFechaInput.classList.add("error");
      const $error = document.createElement("li");
      $error.innerText = error;
      $error.classList.add("alert");
      $error.classList.add("alert-danger");
      $errores.appendChild($error);
      hayErrorPrimeraFecha = true;
    } else {
      primeraFechaInput.classList.remove("error");
      hayErrorPrimeraFecha = false;
    }
  });
}

let hayErrorSegundaFecha;

function manejarErroresSegundaFecha($erroresSegundaFecha) {
  let segundaFechaInput = document.querySelector("#fecha-final");
  const $errores = document.querySelector("#errores-segunda-fecha");
  $errores.innerHTML = "";
  Object.values($erroresSegundaFecha).forEach((error) => {
    if (error) {
      segundaFechaInput.classList.add("error");
      const $error = document.createElement("li");
      $error.innerText = error;
      $error.classList.add("alert");
      $error.classList.add("alert-danger");
      $errores.appendChild($error);
      hayErrorSegundaFecha = true;
    } else {
      segundaFechaInput.classList.remove("error");
      hayErrorSegundaFecha = false;
    }
  });
}
