fetch("https://api.exchangerate.host/symbols")
  .then(respuesta => respuesta.json())
  .then(respuestaJSON => {
    imprimirMonedas(respuestaJSON);
  })

  
  function cargarHistorialDeCambios(cantidadAConvertir, divisaElegida, divisasTotales, fechaPredeterminada, fechaElegida){
    const requestURL = `https://api.exchangerate.host/timeseries?amount=${cantidadAConvertir}&base=${divisaElegida}&symbols=${divisasTotales}&start_date=${fechaPredeterminada}&end_date=${fechaElegida}`;
    fetch(requestURL)
    .then(respuesta => respuesta.json())
    .then(historiaJSON => {
      obtenerPrimerUltimoValor(historiaJSON);
    });
  }

  