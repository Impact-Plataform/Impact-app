const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/dbConnection')

module.exports = {
  async createUser (req, res, next) {
    try {
      try {
        await db.query('INSERT INTO users (name, surname, email, password_hash, user_type) VALUES ($1,$2,$3,$4,$5)',
          [req.body.name,
            req.body.surname,
            req.body.email,
            bcrypt.hashSync(req.body.password, 10),
            req.body.type])
      } catch (error) {
        res.status(400).send({
          error: 'Email already exists'
        })
      }

      const response = {
        message: 'Usuário criado com sucesso',
        createdUsers: {
          name: req.body.name,
          email: req.body.email
        }
      }
      return res.status(201).send(response)
    } catch (error) {
      return res.status(500).send({ error: error })
    }
  },

  async login (req, res, next) {
    try {
      const queryReturn = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email])
      const result = queryReturn.rows
      if (result.length < 1) {
        return res.status(401).send({ message: 'Usuário ou senha inválidos' })
        // delay na resposta
      }
      if (await bcrypt.compareSync(req.body.password, result[0].password_hash)) {
        const token = jwt.sign({
          userId: result[0].userId,
          email: result[0].email
        },
        process.env.SECRET_API,
        {
          expiresIn: '8h'
        })
        return res.status(200).send({
          message: 'Autenticado com sucesso',
          token: token
        })
      }
      return res.status(404).send({ message: 'Usuário ou senha inválidos' })
    } catch (error) {
      return res.status(500).send({ message: 'Falha na autenticação' })
    }
  }

}
