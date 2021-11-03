const insert = require('../helpers/insertStudent')
const Load = require('../helpers/LoadStudent')
const update = require('../helpers/updateStudent')
const erase = require('../helpers/deleteStudent')
class Student {
  constructor (student) {
    this.student_id = student.student_id
    this.name = student.name
    this.jedi = student.jedi
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
      return true
    }
    return false
  }

  async create () {
    try {
      await insert(this)
    } catch (error) {
      return error
    }
  }

  async update () {
    try {
      await update(this)
    } catch (error) {
      return error
    }
  }

  static async deleteStudent (id) {
    await erase(id)
  }

  static async allStudents () {
    return await Load.allStudents()
  }

  static async getStudent () {
    return await Load.student()
  }
}

module.exports = Student
