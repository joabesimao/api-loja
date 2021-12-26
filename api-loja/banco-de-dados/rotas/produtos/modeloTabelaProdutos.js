const Sequelize = require("sequelize");
const instancia = require("../../../banco-de-dados");

const colunas = {
  nomeDoProduto: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  preco: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  descrição: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  foto: {
    type: Sequelize.BLOB,
    allowNull: false,
    
  },
  
};

const opcoes = {
  freezeTableName: true,
  tableName: "apiProdutos",
  timestamps: true,
  createdAt: "dataCriacao",
  upDateAt: "dataAtualizacao",
  version: "versao",
};

module.exports = instancia.define("produtos", colunas, opcoes);
