const app = require('./app')

require('dotenv').config()

app.listen(process.env.PORT || 5000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})
