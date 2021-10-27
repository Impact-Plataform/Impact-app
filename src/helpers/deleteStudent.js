
const db = require('../config/dbConnection')

class erase {
  static async deleteStudent (id) {
    await db.query('DELETE FROM students WHERE student_id = $1', [id])
    await db.query('DELETE FROM studentcontacts WHERE student_id = $1', [id])
    await db.query('DELETE FROM studentdocuments WHERE student_id = $1', [id])
  }
}

module.exports = erase
