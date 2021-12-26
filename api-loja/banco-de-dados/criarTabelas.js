const ModeloTabela = require("./rotas/produtos/modeloTabelaProdutos");

ModeloTabela.sync()
  .then(() => console.log("Tabela criada com sucesso"))
  .catch(console.log);
