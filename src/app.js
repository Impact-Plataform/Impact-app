const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).send({})
  }
  next()
})

app.use('/student', require('./routes/studentRoutes'))
app.use('/user', require('./routes/userRoutes'))

// Rota não encontrada
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.send({
    error: {
      message: error.message
    }
  })
})

module.exports = app
