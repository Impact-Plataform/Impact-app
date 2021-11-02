// const db = require('../config/dbConnection')
const Student = require('../models/student')
// const valida = require('./validaDados')

module.exports = {

  async save (req, res) {
    // Aqui vem o código para cadastro do estudante no banco de dados
    try {
      const student = new Student(req.body.student)
      // console.log(typeof student.name)
      // console.log(typeof student.contacts)
      const result = student.create()
      console.log(result)
      return res.status(201).send({ message: 'Estudante cadastrado com sucesso!' })
    } catch (error) {

    }
  },

  async update (req, res) {
    // Aqui vem o código para atualizar informações do estudante
    const {
      studentId, name, surname, birthDate, cityOfBirth, adress, educationLevel,
      maritalStatus, familyIncome, rg, cpf, phone, email,
      nameResponsible, contactResponsible, documentResponsible,
      nameSpouse, contactSpouse, documentSpouse
    } = req.body

    await Student.update(
      studentId, name, surname, birthDate, cityOfBirth, adress, educationLevel,
      maritalStatus, familyIncome, rg, cpf, phone, email,
      nameResponsible, contactResponsible, documentResponsible,
      nameSpouse, contactSpouse, documentSpouse)

    res.status(200).send({ message: 'Cadastro atualizado com sucesso!' })
  },

  async read (req, res) {
    // Aqui vem o código para busca individual de estudante
    const id = req.params.id
    const result = await Student.oneStudent(id)
    res.status(200).send(result)
  },

  async readAll (req, res) {
    // Aqui vem o código para busca geral de estudante
    const result = await Student.allStudents()
    res.status(200).send(result)
  },

  async delete (req, res) {
    // Aqui vem o código para excluir um cadastro
    const id = req.params.id
    await Student.deleteStudent(id)
    res.status(200).send({ message: 'Cadastro deletado com sucesso!' })
  }

}
