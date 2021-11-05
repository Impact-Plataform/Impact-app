const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/dbConnection')

module.exports = {
  async createUser (req, res) {
    try {
      try {
        await db.query('INSERT INTO users (name, surname, email, password_hash, admin) VALUES ($1,$2,$3,$4,$5)',
          [req.body.name,
            req.body.surname,
            req.body.email,
            bcrypt.hashSync(req.body.password, 10),
            req.body.admin])
      } catch (error) {
        return res.status(406).send({
          error: 'Email ja existe'
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

  async login (req, res) {
    try {
      const queryReturn = await db.query('SELECT name, surname, admin FROM users WHERE email = $1', [req.body.email])
      if (queryReturn.rows.length < 1) {
        return res.status(401).send({ message: 'Usuário ou senha inválidos' })
      }
      const user = queryReturn.rows[0]

      const admin = user.admin === true
      if (await bcrypt.compareSync(req.body.password, user.password_hash)) {
        const token = jwt.sign({
          user: user.name + ' ' + user.surname,
          exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 3),
          admin: admin
        },
        process.env.JWT_KEY,
        {
          expiresIn: '3h'
        })
        return res.status(200).send({
          user: user.name,
          admin: admin,
          token: token
        })
      }
      return res.status(404).send({ message: 'Usuário ou senha inválidos' })
    } catch (error) {
      return res.status(500).send({ message: 'Falha na autenticação' })
    }
  }
}
