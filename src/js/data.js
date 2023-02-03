fetch("https://api.exchangerate.host/symbols")
  .then(respuesta => respuesta.json())
  .then(respuestaJSON => {
    imprimirMonedas(respuestaJSON);
  })

  function cargarHistorialDeCambios(base, symbols, startDate, endDate){
    const requestURL = 'https://api.exchangerate.host/history?base=' + base + '&symbols=' + symbols + '&start_at=' + startDate + '&end_at=' + endDate;
    fetch(requestURL)
    .then(respuesta => respuesta.json())
    .then(cambiosJSON =>{
      console.log(cambiosJSON)
      //cargarHistorial(cambiosJSON);
    })
  }

  
  function cargarHistorialDeCambiosDinero(cantidad, divisa, divisasTotales, fechaDeInicio, fechaFinal){
    const requestURL = `https://api.exchangerate.host/timeseries?amount=${cantidad}&base=${divisa}&symbols=${divisasTotales}&start_date=${fechaDeInicio}&end_date=${fechaFinal}`;
    fetch(requestURL)
    .then(respuesta => respuesta.json())
    .then(historiaJSON=>{
      console.log(historiaJSON)
    })
  }

  cargarHistorialDeCambiosDinero(1000, 'USD', 'EUR,CZK', '2023-02-01', '2023-02-03');


