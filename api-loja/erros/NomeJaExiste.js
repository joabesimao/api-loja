class NomeJaExiste extends Error {
  constructor() {
    super("já existe um produto cadastrado com esse nome!");
    this.name = "NomeJaExiste";
    this.idErro = 0;
  }
}
module.exports = NomeJaExiste;
