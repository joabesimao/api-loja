const Modelo = require("./modeloTabelaProdutos");
const NaoEncontrado = require("../../../erros/NaoEncontrado");
const NomeJaExiste = require("../../../erros/NomeJaExiste");

module.exports = {
  listar() {
    return Modelo.findAll({ raw: true });
  },
  async inserir(produto) {
    const produtoNoBanco = await Modelo.findOne({
      where: {
        nomeDoProduto: produto.nomeDoProduto,
      },
    });

    if (produtoNoBanco) {
      throw new NomeJaExiste();
    }
    return Modelo.create(produto);
  },
  async pegarPorId(id) {
    const produtoEncontrado = await Modelo.findOne({
      where: {
        id: id,
      },
    });
    if (!produtoEncontrado) {
      throw new NaoEncontrado();
    }
    return produtoEncontrado;
  },
  atualizar(id, dadosParaAtualizar) {
    return Modelo.update(dadosParaAtualizar, {
      where: { id: id },
    });
  },
  remover(id) {
    return Modelo.destroy({
      where: { id: id },
    });
  },
  criarImagem(foto) {
    return Modelo.create(foto);
  },
  listarImagem() {
    return Modelo.findAll({ raw: true });
  },
};
