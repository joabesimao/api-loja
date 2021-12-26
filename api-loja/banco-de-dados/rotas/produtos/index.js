const roteador = require("express").Router();
const multer = require("multer");
const upLoad = multer({ dest: "/uploads/" });
const TabelaProduto = require("./TabelaProduto");
const Produto = require("./Produto");
const NaoEncontrado = require("../../../erros/NaoEncontrado");
const DadosNaoFornecidos = require("../../../erros/DadosNaoFornecidos");
const SerializadorProduto =
  require("../../../Serializador").SerializadorProduto;
//const upLoad = require("../../arquivos/uploadProduto");
const SerializadorImagemProduto =
  require("../../../Serializador").SerializadorImagemProduto;

roteador.get("/", async (requisicao, resposta) => {
  const resultados = await TabelaProduto.listar();
  resposta.status(200);
  const serializador = new SerializadorProduto(
    resposta.getHeader("Content-Type")
  );
  resposta.send(serializador.serializar(resultados));
});

roteador.post(
  "/",
  upLoad.single("produtoImagem"),
  async (requisicao, resposta, proximo) => {
    try {
      console.log(requisicao.file);
      const dadosRecebidos = requisicao.body;
      const produto = new Produto(dadosRecebidos);
      await produto.criar();
      resposta.status(201);
      const serializador = new SerializadorProduto(
        resposta.getHeader("Content-Type")
      );
      resposta.send(serializador.serializar(produto));
    } catch (erro) {
      proximo(erro);
    }
  }
  
);

roteador.get(
  "/:idProduto",
  upLoad.single("produtoImagem"),
  async (requisicao, resposta, proximo) => {
    try {
      const id = requisicao.params.idProduto;
      const produto = new Produto({ id: id });
      await produto.carregar();
      resposta.status(200);
      const serializador = new SerializadorProduto(
        resposta.getHeader("Content-Type"),
        ["dataCriacao", "dataAtualizacao", "versao"]
      );
      resposta.send(serializador.serializar(produto));
    } catch (erro) {
      proximo(erro);
    }
  }
);

roteador.put(
  "/:idProduto",
  upLoad.single("produtoImagem"),
  async (requisicao, resposta, proximo) => {
    try {
      console.log(requisicao.file);
      const id = requisicao.params.idProduto;
      const produtoImagem = requisicao.params.file;

      const dadosRecebidos = requisicao.body;

      const dados = Object.assign({}, produtoImagem, dadosRecebidos, {
        id: id,
      });
      const produto = new Produto(dados);
      await produto.atualizar();
      resposta.status(204);
      resposta.end();
    } catch (erro) {
      proximo(erro);
    }
  }
);

roteador.delete("/:idProduto", async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.idProduto;
    const produto = new Produto({ id: id });
    await produto.carregar();
    await produto.remover();
    resposta.status(204);
    resposta.end();
  } catch (erro) {
    proximo(erro);
  }
});
const roteadorProdutos = require("./produtos");
const Serializador = require("../../../Serializador");
roteador.use("/:idProduto/produtos", roteadorProdutos);

module.exports = roteador;
