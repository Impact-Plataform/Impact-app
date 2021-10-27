// const db = require('../config/dbConnection')
const student = require('../models/student')
const valida = require('./validaDados')

module.exports = {

  async save (req, res) {
    // Aqui vem o código para cadastro do estudante no banco de dados
    const {
      name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, employmentStatus,
      income, numberOfHousehold, familyIncome, rg, cpf, phone, email
    } = req.body

    const rgIsnumber = await valida.isNumber(rg)
    if (!rgIsnumber) {
      return res.status(400).json({ errors: 'RG contém letras!!' })
    }

    const cpfIsnumber = await valida.isNumber(cpf)
    if (!cpfIsnumber) {
      return res.status(400).json({ errors: 'CPF contém letras!!' })
    }

    const validaCpf = await valida.cpf(cpf)
    if (!validaCpf) {
      return res.status(400).json({ errors: 'CPF Inválido!!' })
    }

    const validaEmail = await valida.email(email)
    if (!validaEmail) {
      return res.status(400).json({ errors: 'Email invalido' })
    } else {
      const result = await student.create(
        name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus,
        employmentStatus, income, numberOfHousehold, familyIncome, rg, cpf, phone, email)

      res.status(201).send(result)
    }
  },

  async update (req, res) {
    // Aqui vem o código para atualizar informações do estudante
    const {
      studentId, name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, employmentStatus,
      income, numberOfHousehold, familyIncome, rg, cpf, phone, email
    } = req.body

    await student.update(
      studentId, name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus,
      employmentStatus, income, numberOfHousehold, familyIncome, rg, cpf, phone, email)
  },

  async read (req, res) {
    // Aqui vem o código para busca individual de estudante
    const id = req.params.id
    const result = await student.oneStudent(id)
    res.status(200).send(result)
  },

  async readAll (req, res) {
    // Aqui vem o código para busca geral de estudante
    const result = await student.allStudents()
    res.status(200).send(result)
  },

  async delete (req, res) {
    // Aqui vem o código para excluir um cadastro
    const id = req.params.id
    await student.deleteStudent(id)
  }

}
