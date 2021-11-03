const db = require('../config/dbConnection')
const pgp = require('pg-promise')({
  capSQL: true
})

module.exports = async (student) => {
  if (await !student.isMinor()) {
    delete student.parent
  }
  const keys = Object.keys(student).filter(key => {
    if (typeof (student[key]) !== 'object' && key.indexOf('_id') === -1) {
      return key
    }
    return false
  })
  const queries = []
  const condition = ` WHERE student_id = ${student.student_id}`
  const columnStudents = new pgp.helpers.ColumnSet(keys, { table: 'students' })
  queries.push(pgp.helpers.update(student, columnStudents) + condition)
  const entities = Object.keys(student).filter(key => {
    return typeof (student[key]) === 'object' ? key : false
  })
  entities.forEach(entity => {
    const columnEntity = new pgp.helpers.ColumnSet(Object.keys(student[entity]), { table: `student${entity}` })
    queries.push(pgp.helpers.update(student[entity], columnEntity) + condition)
  })
  try {
    await db.query(queries.join(';'))
  } catch (error) {
    console.log(error)
    return error
  }
}
