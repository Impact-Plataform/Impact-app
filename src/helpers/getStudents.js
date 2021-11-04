
const db = require('../config/dbConnection')
const isMinor = require('./isMinor')

const condition = ' WHERE student_id = $1'

const studentQuery = 'SELECT student_id, name, income, schooling, family_members, government_aid, family_members_with_disability, birthdate, jedi, city_of_birth, marital_status, family_income FROM students '
const documentsQuery = 'SELECT rg, cpf FROM studentdocuments '
const addressQuery = 'SELECT street, number, cep, complement FROM studentaddress '
const contactsQuery = 'SELECT email, phone FROM studentcontacts '
const parentQuery = 'SELECT name, relationship, cpf, phone FROM studentparent '

async function aditionalQueries (student) {
  const contacts = await db.query(contactsQuery + condition, [student.student_id])
  const documents = await db.query(documentsQuery + condition, [student.student_id])
  const address = await db.query(addressQuery + condition, [student.student_id])

  student.contacts = contacts.rows[0]
  student.documents = documents.rows[0]
  student.address = address.rows[0]

  if (isMinor(student.birthdate)) {
    const parent = await db.query(parentQuery + condition, [student.student_id])
    student.parent = parent.rows[0]
  }

  return student
}

module.exports = {
  async getAllStudents () {
    const students = (await db.query(studentQuery + 'WHERE is_active = TRUE')).rows

    return Promise.all(students.map(async student => {
      const completedStudent = await aditionalQueries(student)
      return completedStudent
    }))
  },

  async getStudent (id) {
    const student = await (await db.query(studentQuery + condition + 'AND is_active = TRUE', [id])).rows[0]
    if (!student) {
      const error = new Error('Student not found')
      error.status = 404
      return error
    }
    return await aditionalQueries(student)
  }
}
