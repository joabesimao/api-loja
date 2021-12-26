class NaoEncontrado extends Error {
  constructor() {
    super("produto nao foi encontrado!");
    this.name = "NaoEncontrado";
    this.idErro = 0;
  }
}
module.exports = NaoEncontrado;
