
const db = require('../config/dbConnection')
const pgp = require('pg-promise')({
  capSQL: true // if you want all generated SQL capitalized
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
  const queries = []
  const columnStudents = new pgp.helpers.ColumnSet(keys, { table: 'students' })
  queries.push(pgp.helpers.insert(student, columnStudents) + ' RETURNING student_id')

  const entities = Object.keys(student).filter(key => {
    return !keys.find(k => k === key) && student[key] !== undefined ? key : false
  })

  entities.forEach(entity => {
    const columnEntity = new pgp.helpers.ColumnSet(Object.keys(student[entity]), { table: `student${entity}` })
    const queryEntity = pgp.helpers.insert(student[entity], columnEntity)
    queries.push(queryEntity)
  })
  console.log(queries)
  try {
    const result = await db.query(queries.join(';'))
    console.log(result.rows)
  } catch (error) {
    console.log(error)
  }
}
