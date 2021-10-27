const { Router } = require('express')
const router = Router()

const userController = require('../controllers/userController')

router.post('/signup', userController.createUser)
router.post('/signin', userController.login)

module.exports = router
