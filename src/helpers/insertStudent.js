
const db = require('../config/dbConnection')
const pgp = require('pg-promise')({
  capSQL: true
})

module.exports = async (student) => {
  if (await !student.isMinor()) {
    delete student.parent
  }
  const keys = Object.keys(student).filter(key => {
    if (typeof (student[key]) !== 'object' && student[key] !== undefined) {
      return key
    }
    return false
  })
  const aditionalQuery = []
  const columnStudents = new pgp.helpers.ColumnSet(keys, { table: 'students' })
  const mainQuery = pgp.helpers.insert(student, columnStudents) + ' RETURNING student_id'
  const queryRet = await db.query(mainQuery)
  student.student_id = queryRet.rows[0].student_id

  const entities = Object.keys(student).filter(key => {
    return typeof (student[key]) === 'object' ? key : false
  })
  entities.forEach(entity => {
    student[entity].student_id = student.student_id
    const columnEntity = new pgp.helpers.ColumnSet(Object.keys(student[entity]), { table: `student${entity}` })
    const queryEntity = pgp.helpers.insert(student[entity], columnEntity)
    aditionalQuery.push(queryEntity)
  })
  try {
    await db.query(aditionalQuery.join(';'))
  } catch (error) {
    return error
  }
}
