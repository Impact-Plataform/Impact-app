const router = require('express').Router()
const { required, adminOnly } = require('../middleware/auth')
const userController = require('../controllers/userController')

router.post('/register', required, adminOnly, userController.createUser)
router.post('/login', userController.login)

module.exports = router
