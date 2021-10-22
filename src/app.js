

const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/student', require('./routes/studentRoutes'))
app.use('/user', require('./routes/userRoutes'))
module.exports = app
