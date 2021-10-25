// const db = require('../config/dbConnection')
const student = require('../models/student')

module.exports = {

  async save (req, res) {
    // Aqui vem o código para cadastro do estudante no banco de dados
    let {name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, employmentStatus, 
      income, numberOfHousehold, familyIncome, rg, cpf, phone, email} = req.body

    await student.create(
      name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, 
      employmentStatus, income, numberOfHousehold, familyIncome, rg, cpf, phone, email)
  },

  async update (req, res) {
    // Aqui vem o código para atualizar informações do estudante
    let {student_id, name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, employmentStatus, 
      income, numberOfHousehold, familyIncome, rg, cpf, phone, email} = req.body

    await student.update(
      student_id, name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, 
      employmentStatus, income, numberOfHousehold, familyIncome, rg, cpf, phone, email)
  },

  async read (req, res) {
    // Aqui vem o código para busca individual de estudante
    let id = req.params.id
    let result = await student.oneStudent(id)
    res.status(200).send(result)
  },

  async readAll (req, res) {
    // Aqui vem o código para busca geral de estudante
    let result = await student.allStudents()
    res.status(200).send(result)
  },

  async delete (req, res) {
    // Aqui vem o código para excluir um cadastro
    let id = req.params.id
    await student.deleteStudent(id)
  }

}
