const TabelaProduto = require("./TabelaProduto");
const CampoInvalido = require("../../../erros/CampoInvalido");
const DadosNaoFornecidos = require("../../../erros/DadosNaoFornecidos");

class Produto {
  constructor({
    id,
    nomeDoProduto,
    preco,
    descricao,
    foto = "https:/desktop/perfil.png",
    dataCriacao,
    dataAtualizacao,
    versao,
  }) {
    (this.id = id), (this.nomeDoProduto = nomeDoProduto);
    this.preco = preco;
    this.descricao = descricao;
    this.foto = foto;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }
  async criar() {
    this.validar();
    const resultado = await TabelaProduto.inserir({
      nomeDoProduto: this.nomeDoProduto,
      preco: this.preco,
      descrição: this.descricao,
      foto: this.foto,
    });
    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }
  async carregar() {
    const produtoEncontrado = await TabelaProduto.pegarPorId(this.id);
    this.nomeDoProduto = produtoEncontrado.nomeDoProduto;
    this.preco = produtoEncontrado.preco;
    this.descricao = produtoEncontrado.descricao;
    this.foto = produtoEncontrado.foto;
    this.dataCriacao = produtoEncontrado.dataCriacao;
    this.dataAtualizacao = produtoEncontrado.dataAtualizacao;
    this.versao = produtoEncontrado.versao;
  }
  async atualizar() {
    await TabelaProduto.pegarPorId(this.id);
    const campos = ["nomeDoProduto", "preco", "descricao"];
    const dadosParaAtualizar = {};

    campos.forEach((campos) => {
      const valor = this[campos];
      if (typeof valor === "string" && valor.length > 0) {
        dadosParaAtualizar[campos] = valor;
      }
      if (typeof valor === "number") {
        dadosParaAtualizar[campos] = valor;
      }
    });
    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new DadosNaoFornecidos();
    }
    await TabelaProduto.atualizar(this.id, dadosParaAtualizar);
  }
  remover() {
    return TabelaProduto.remover(this.id);
  }
  validar() {
    const campos = ["nomeDoProduto", "preco", "descricao"];

    campos.forEach((campo) => {
      const valor = this[campo];

      if (typeof valor !== "string" || valor.length === 0) {
        throw new CampoInvalido(campo);
      }
    });
  }
  carregarImagem() {
    const imagemCarregada = TabelaProduto.listarImagem(this.id, this.foto);
    this.foto = imagemCarregada.foto;
  }
}

module.exports = Produto;
