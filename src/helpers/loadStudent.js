
const db = require('../config/dbConnection')
// const Student = require('../models/student')

class load {
  static async allStudents () {
    const studentsArray = []

    const students = await db.query('SELECT student_id, name, surname, birthdate, city_of_birth, adress, education_level, marital_status, family_income, updated_by FROM students WHERE active = TRUE')

    for (let i = 0; i < students.rows.length; i++) {
      const student = students.rows[i]
      const id = students.rows[i].student_id
      const contacts = await db.query('SELECT contact_type, contact_description, contact_value FROM studentcontacts WHERE student_id = $1', [id])
      const documents = await db.query('SELECT document_type, document_description, document_value FROM studentdocuments WHERE student_id = $1', [id])
      const responsable = await db.query('SELECT name, contact, document FROM studentresponsible WHERE student_id = $1', [id])
      const spouse = await db.query('SELECT name, contact, document FROM studentconjuge WHERE student_id = $1', [id])

      const studentJson = {}

      console.log(student)
      studentJson.student = student
      studentJson.student.contacts = contacts.rows
      studentJson.student.documents = documents.rows
      studentJson.student.responsable = responsable.rows
      studentJson.student.spouse = spouse.rows

      studentsArray.push(studentJson)
    }

    return studentsArray
  }

  static async student (student) {
    // const students = new Student()
    // if (await !student.isMinor()) {
    //   delete student.parent
    // }
    let keys = Object.keys(student).filter(key => {
      if (typeof (student[key]) !== 'object' && student[key] !== undefined) {
        return key
      }
      return false
    })
    keys = keys.join(', ')
    console.log(keys)
    // const id = student.student_id

    // const students = await db.query('SELECT student_id, name, surname, birthdate, city_of_birth, adress, education_level, marital_status, family_income, updated_by FROM students WHERE student_id = $1 AND active = TRUE', [id])
    // const contacts = await db.query('SELECT contact_type, contact_description, contact_value FROM studentcontacts WHERE student_id = $1', [id])
    // const documents = await db.query('SELECT document_type, document_description, document_value FROM studentdocuments WHERE student_id = $1', [id])
    // const responsable = await db.query('SELECT name, contact, document FROM studentresponsible WHERE student_id = $1', [id])
    // const spouse = await db.query('SELECT name, contact, document FROM studentconjuge WHERE student_id = $1', [id])

    // const studentJson = {}

    // studentJson.student = students.rows[0]
    // studentJson.student.contacts = contacts.rows
    // studentJson.student.documents = documents.rows
    // studentJson.student.responsable = responsable.rows
    // studentJson.student.spouse = spouse.rows

    // return studentJson
  }
}

module.exports = load
