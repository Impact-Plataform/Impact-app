const { Router } = require('express')
const router = Router()
const studentController = require('../controllers/studentController')

router.post('/saveStudents', studentController.save)
router.get('/getStudent/:id', studentController.read)
router.get('/getAllStudents', studentController.readAll)
router.put('/updateStudents/:id', studentController.update)
router.delete('/deleteStudents/:id', studentController.delete)

module.exports = router
