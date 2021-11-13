const insert = require('../helpers/insertStudent')

const update = require('../helpers/updateStudent')
const erase = require('../helpers/deleteStudent')
class Student {
  constructor (student) {
    this.student_id = student.student_id || undefined
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
}

module.exports = Student
