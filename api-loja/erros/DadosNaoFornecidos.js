class DadosNaoFornecidos extends Error {
  constructor() {
    super("nao foram fornecidos dados para atualizar");
    this.name = "DadosNaoFornecidos";
    this.idErro = 2;
  }
}
module.exports = DadosNaoFornecidos;
