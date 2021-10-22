const db = require('../../src/config/dbConnection')
const cleaner = require('postgres-cleaner')

module.exports = () => {
  const options = {
    type: 'delete',
    skipTables: ['SequelizeMeta']
  }
  return Promise.all(cleaner(options, db))
}
