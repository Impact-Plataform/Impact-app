const router = require('express').Router()
// const { required, adminOnly } = require('../middleware/auth')
const userController = require('../controllers/userController')
// required, adminOnly,
router.post('/register', userController.createUser)
router.post('/login', userController.login)

module.exports = router
