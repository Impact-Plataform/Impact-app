// const db = require('../config/dbConnection')

module.exports = {
  async save (req, res) {
    // Aqui vem o código para cadastro do estudante no banco de dados
    res.status(200).send('Ola mundo')
  },
  async read (req, res) {
    // Aqui vem o código para busca individual de estudante
    res.status(200).send('Ola mundo')
  },
  async readAll (req, res) {
    // Aqui vem o código para busca geral de estudante
    res.status(200).send('Ola mundo')
  },
  async update (req, res) {
    // Aqui vem o código para atualizar informações do estudante
    res.status(200).send('Ola mundo')
  },
  async delete (req, res) {
    // Aqui vem o código para excluir um cadastro
    res.status(200).send('Ola mundo')
  }

}
