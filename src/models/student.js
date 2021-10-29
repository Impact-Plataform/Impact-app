const insert = require('../helpers/insertStudent')
const load = require('../helpers/loadStudent')
const update = require('../helpers/updateStudent')
const erase = require('../helpers/deleteStudent')

class Student {
  constructor (id, name, surname, adress, birthdate, cityOfBirth,
    educationLevel, maritalStatus, familyIncome, contact, document, responsible, spouse) {
    this.id = id
    this.name = name
    this.surname = surname
    this.birthdate = birthdate
    this.cityOfBirth = cityOfBirth
    this.adress = adress
    this.educationLevel = educationLevel
    this.maritalStatus = maritalStatus
    this.familyIncome = familyIncome
    this.contact = contact
    this.document = document
    this.responsible = responsible
    this.spouse = responsible
  }

  static async create (name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus,
    familyIncome, rg, cpf, phone, email, nameResponsible, contactResponsible, documentResponsible, 
    nameSpouse, contactSpouse, documentSpouse) {

    await insert.insertStudent(name, surname, birthDate, cityOfBirth, adress, educationLevel, 
      maritalStatus, familyIncome, rg, cpf, phone, email, nameResponsible, contactResponsible, documentResponsible, 
      nameSpouse, contactSpouse, documentSpouse)

  }

  static async update (studentId, name, surname, birthDate, cityOfBirth, adress, educationLevel, 
    maritalStatus, familyIncome, rg, cpf, phone, email, nameResponsible, contactResponsible, documentResponsible, 
    nameSpouse, contactSpouse, documentSpouse) {

    await update.updateStudent(studentId, name, surname, birthDate, cityOfBirth, adress, educationLevel, 
      maritalStatus, familyIncome, rg, cpf, phone, email, nameResponsible, contactResponsible, documentResponsible, 
      nameSpouse, contactSpouse, documentSpouse)

  }

  static async deleteStudent (id) {
    await erase.deleteStudent(id)
  }

  static async allStudents () {
    return await load.allStudents()
  }

  static async oneStudent (id) {
    return await load.oneStudent(id)
  }
}

module.exports = Student
