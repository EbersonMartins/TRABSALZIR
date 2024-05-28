var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Oi, mundo :-)');
});

function soma(a, b) {
  return a + b;
}

app.post('/soma', function (req, res) {
  var body = req.body;
  var resultado = soma(body.a, body.b);

  res.send(`O resultado da soma de ${body.a} e ${body.b} é ${resultado}`);
});
app.get('/soma', function(req, res) {
  // Obtém os parâmetros de consulta da URL
  var a = parseFloat(req.query.a);
  var b = parseFloat(req.query.b);

  // Verifica se ambos os parâmetros foram fornecidos
  if (!isNaN(a) && !isNaN(b)) {
    var resultado = soma(a, b);
    res.send(`O resultado da soma de ${a} e ${b} é ${resultado}`);
  } else {
    res.send('Por favor, forneça os parâmetros "a" e "b" na URL como ?a=numero1&b=numero2');
  }
});

var port = 3001;

// iniciando o processo do servidor
app.listen(port, function() {
  console.log(`App de Exemplo escutando na porta http://localhost:${port}/`);
});