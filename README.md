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

// Rota GET para exibir o formulário e o resultado (se houver)
app.get('/', function(req, res) {
  var html = `
    <form action="/soma" method="POST">
      <label for="a">Número A:</label>
      <input type="number" id="a" name="a" step="any" required>
      <br>
      <label for="b">Número B:</label>
      <input type="number" id="b" name="b" step="any" required>
      <br>
      <button type="submit">Somar</button>
    </form>
  `;

  if (resultadoSoma !== null) {
    html += `<p>O resultado da soma é: ${resultadoSoma}</p>`;
  }

  res.send(html);
});

// Rota POST para realizar a soma e redirecionar para a página inicial
app.post('/soma', function (req, res) {
  var a = parseFloat(req.body.a);
  var b = parseFloat(req.body.b);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).send('Parâmetros inválidos. Certifique-se de passar números para a e b.');
    return;
  }

  resultadoSoma = soma(a, b);
  res.redirect('/');
});

var port = 3001;

// Iniciando o processo do servidor
app.listen(port, function() {
  console.log(`App de Exemplo escutando na porta http://localhost:${port}/`);
});
