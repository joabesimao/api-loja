const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("config");
const multer = require("multer");
const upLoad = multer({ dest: "/uploads/" });
const NaoEncontrado = require("./erros/NaoEncontrado");
const CampoInvalido = require("./erros/CampoInvalido");
const DadosNaoFornecidos = require("./erros/DadosNaoFornecidos");
const ValorNaoSuportado = require("./erros/ValorNaoSuportado");
const formatosAceitos = require("./Serializador").formatosAceitos;
//const imagem = require("./banco-de-dados/arquivos/uploadProduto");
const roteador = require("./banco-de-dados/rotas/produtos");
const NomeJaExiste = require("./erros/NomeJaExiste");

app.use(bodyParser.json());

app.use((requisicao, resposta, proximo) => {
  let formatoRequisitado = requisicao.header("Accept");
  if (formatoRequisitado === "*/*") {
    formatoRequisitado = "application/json";
  }
  if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
    resposta.status(406);
    resposta.end();
    return;
  }

  resposta.setHeader("Content-Type", formatoRequisitado);
  proximo();
});

app.use("/api-loja/produtos", roteador);

app.use((erro, requisicao, resposta, proximo) => {
  let status = 500;

  if (erro instanceof NaoEncontrado) {
    status = 404;
  }
  if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
    status = 400;
  }
  if (erro instanceof ValorNaoSuportado) {
    status = 406;
  }

  if (erro instanceof NomeJaExiste) {
    status = 409;
  }

  resposta.status(status);
  resposta.send(
    JSON.stringify({
      mensagem: erro.message,
      id: erro.idErro,
    })
  );
});

app.listen(config.get("api.porta"), () =>
  console.log(" A API ESTA FUNCIONANDO CORRETAMENTE!")
  
);
