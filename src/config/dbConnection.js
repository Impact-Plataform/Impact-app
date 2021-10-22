const { Pool } = require('pg')
const fs = require('fs')

const config = fs.readFileSync('src/config/settings.json').toString()

const configJson = JSON.parse(config)

const client = new Pool({
    connectionString: configJson.connectString,
    ssl: {
        rejectUnauthorized: false,
    }
})

module.exports = client