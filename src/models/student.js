const insertStudent = require('../helpers/insertStudent')
const load = require('../helpers/loadStudent')
const update = require('../helpers/updateStudent')
const erase = require('../helpers/deleteStudent')
class Student {
  constructor (student) {
    this.id = student.id
    this.name = student.name
    this.address = student.address
    this.birthdate = student.birthdate
    this.income = student.income
    this.city_of_birth = student.city_of_birth
    this.schooling = student.schooling
    this.marital_status = student.marital_status
    this.family_income = student.family_income
    this.family_members = student.family_members
    this.contacts = student.contacts
    this.documents = student.documents
    this.parent = student.parent
    this.government_aid = student.government_aid
    this.family_members_with_disability = student.family_members_with_disability
  }

  isMinor () {
    const today = new Date()
    const birth = new Date(this.birthdate.split('/').reverse().join('-'))
    const age = today.getFullYear() - birth.getFullYear()
    if (age < 18) {
      console.log('É menor de idade   ' + age)
      return true
    }

    return false
  }

  async create () {
    insertStudent(this)
  }

  static async update () {
    await update.updateStudent(this.id, this.name, this.address, this.birthdate, this.income, this.cityOfBirth,
      this.schooling, this.maritalStatus, this.familyIncome, this.familyMembers, this.contacts, this.documents, this.parent, this.governmentAid, this.familyMembersWithDisability)
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
