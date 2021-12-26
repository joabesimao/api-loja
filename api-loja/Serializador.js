const ValorNaoSuportado = require("./erros/ValorNaoSuportado");
const jsonToXml = require("jsontoxml");

class Serializador {
  json(dados) {
    return JSON.stringify(dados);
  }

  xml(dados) {
    let tag = this.tagSingular;
    if (Array.isArray(dados)) {
      tag = this.tagPlural;
      dados = dados.map((item) => {
        return {
          [this.tagSingular]: item,
        };
      });
    }
    return jsonToXml({ [tag]: dados });
  }

  serializar(dados) {
    dados = this.filtrar(dados);
    if (this.contentType === "application/json") {
      return this.json(this.filtrar(dados));
    }
    if (this.contentType === "application/xml") {
      return this.xml(dados);
    }
    throw new ValorNaoSuportado(this.contentType);
  }

  filtrarObjeto(dados) {
    const novoObjeto = {};

    this.camposPublicos.forEach((campo) => {
      if (dados.hasOwnProperty(campo)) {
        novoObjeto[campo] = dados[campo];
      }
    });
    return novoObjeto;
  }

  filtrar(dados) {
    if (Array.isArray(dados)) {
      dados = dados.map((item) => {
        return this.filtrarObjeto(item);
      });
    } else {
      dados = this.filtrarObjeto(dados);
    }
    return dados;
  }
}

class SerializadorProduto extends Serializador {
  constructor(contentType, camposExtras) {
    super();
    this.contentType = contentType;
    this.camposPublicos = [
      "id",
      "nomeDoProduto",
      "preco",
      "foto",
      "descricao",
    ].concat(camposExtras || []);
    this.tagSingular = "produto";
    this.tagPlural = "produtos";
  }
}

class SerializadorErro extends Serializador {
  constructor(contentType, camposExtras) {
    super();
    this.contentType = contentType;
    this.camposPublicos = ["id", "mensagem"].concat(camposExtras || []);
    this.tagSingular = "erro";
    this.tagPlural = "erros";
  }
}
//class SerializadorImagem {
//constructor( foto) {
//super();
//this.contentType = contentType;
//this.foto = foto;
//}
//}

module.exports = {
  Serializador: Serializador,
  SerializadorProduto: SerializadorProduto,
  SerializadorErro: SerializadorErro,
  //SerializadorImagem: SerializadorImagem,
  formatosAceitos: ["*/*", "application/json", "application/xml"],
};
