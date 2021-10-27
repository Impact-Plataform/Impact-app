
const db = require('../config/dbConnection')

class load {
  static async allStudents () {
    const studentsArray = []
    const students = await db.query('SELECT * FROM students')

    for (let i = 0; i < students.rows.length; i++) {
      const student = students.rows[i]
      const id = students.rows[i].student_id
      const contacts = await db.query('SELECT contact_type, contact_description, contact_value FROM studentcontacts WHERE student_id = $1', [id])
      const documents = await db.query('SELECT document_type, document_description, document_value FROM studentdocuments WHERE student_id = $1', [id])

      const studentJson = {}

      studentJson.student = student
      studentJson.student.contacts = contacts.rows
      studentJson.student.documents = documents.rows

      studentsArray.push(studentJson)
    }
    return studentsArray
  }

  static async oneStudent (id) {
    const students = await db.query('SELECT * FROM students WHERE student_id = $1', [id])
    const contacts = await db.query('SELECT contact_type, contact_description, contact_value FROM studentcontacts WHERE student_id = $1', [id])
    const documents = await db.query('SELECT document_type, document_description, document_value FROM studentdocuments WHERE student_id = $1', [id])

    const studentJson = {}

    studentJson.student = students.rows
    studentJson.contacts = contacts.rows
    studentJson.documents = documents.rows

    // console.log(studentJson.student)

    return studentJson
  }
}

module.exports = load
