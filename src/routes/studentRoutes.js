const { Router } = require('express')
const router = Router()
const studentController = require('../controllers/studentController')
const { required, adminOnly } = require('../middleware/auth')

router.post('/saveStudents', required, adminOnly, studentController.save)
router.get('/getStudent/:id', required, studentController.read)
router.get('/getAllStudents', required, studentController.readAll)
router.put('/updateStudents/:id', required, adminOnly, studentController.update)
router.delete('/deleteStudents/:id', required, adminOnly, studentController.delete)

module.exports = router
