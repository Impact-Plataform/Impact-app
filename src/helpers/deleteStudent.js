
const db = require('../config/dbConnection')

class erase {
  static async deleteStudent (id) {
    await db.query('UPDATE students SET active = FALSE WHERE student_id = $1', [id])
    await db.query('UPDATE studentcontacts SET active = FALSE WHERE student_id = $1', [id])
    await db.query('UPDATE studentdocuments SET active = FALSE WHERE student_id = $1', [id])
    await db.query('UPDATE studentResponsible SET active = FALSE WHERE student_id = $1', [id])
    await db.query('UPDATE studentConjuge SET active = FALSE WHERE student_id = $1', [id])
  }
}

module.exports = erase
