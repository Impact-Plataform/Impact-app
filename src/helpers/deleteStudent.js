
const db = require('../config/dbConnection')

module.exports = async (id) => {
  try {
    await db.query('UPDATE students SET is_active = FALSE WHERE student_id = $1', [id])
    await db.query('UPDATE studentcontacts SET is_active = FALSE WHERE student_id = $1', [id])
    await db.query('UPDATE studentdocuments SET is_active = FALSE WHERE student_id = $1', [id])
    await db.query('UPDATE studentResponsible SET is_active = FALSE WHERE student_id = $1', [id])
    await db.query('UPDATE studentConjuge SET is_active = FALSE WHERE student_id = $1', [id])
  } catch (error) {
    return error
  }
}
