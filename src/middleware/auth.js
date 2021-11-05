const jwt = require('jsonwebtoken')
exports.required = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(token, process.env.JWT_KEY)
      req.user = decode
      next()
    } catch (error) {
      return res.status(401).send({ mensagem: 'Falha ao ao autenticar token' })
    }
  } else {
    return res.status(403).send({ mensagem: 'No token provided.' })
  }
}
exports.adminOnly = (req, res, next) => {
  if (req.user.admin !== true) {
    return res.status(403).send({ mensagem: 'Acesso negado' })
  }
  next()
}
