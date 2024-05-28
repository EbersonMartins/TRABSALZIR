var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

// Middleware para analisar o corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var resultadoSoma = null;

// Função para realizar a soma
function soma(a, b) {
  return a + b;
}

// Rota GET para exibir o resultado da soma (se houver)
app.get('/', function(req, res) {
  var html = `
    <h1>Calculadora de Soma</h1>
    <p>Para somar números, faça uma requisição POST para <code>/soma</code> com os parâmetros <code>a</code> e <code>b</code>.</p>
  `;

  if (resultadoSoma !== null) {
    html += `<p>O resultado da última soma é: ${resultadoSoma}</p>`;
  } else {
    html += `<p>Ainda não foi realizada nenhuma soma.</p>`;
  }

  res.send(html);
});

// Rota POST para realizar a soma
app.post('/soma', function (req, res) {
  var a = parseFloat(req.body.a);
  var b = parseFloat(req.body.b);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).send('Parâmetros inválidos. Certifique-se de passar números para a e b.');
    return;
  }

  resultadoSoma = soma(a, b);
  res.send(`O resultado da soma de ${a} e ${b} é ${resultadoSoma}`);
});

var port = 3001;

// Iniciando o processo do servidor
app.listen(port, function() {
  console.log(`App de Exemplo escutando na porta http://localhost:${port}/`);
});
