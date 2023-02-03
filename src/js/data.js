function obtenerDivisas() {
  const requestURL = 'https://api.exchangerate.host/symbols';
  const request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    const response = request.response;
    procesarSimbolos(response.symbols);
  }
}

function obtenerHistorialDeCambios(base, symbols, startDate, endDate) {
  const requestURL = 'https://api.exchangerate.host/history?base=' + base + '&symbols=' + symbols + '&start_at=' + startDate + '&end_at=' + endDate;
  const request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    const response = request.response;
    console.log(response);
  }
}
