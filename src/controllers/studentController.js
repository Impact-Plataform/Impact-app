const Student = require('../models/student')

module.exports = {

  async save (req, res) {
    const student = new Student(req.body.student)
    try {
      await student.create()
      return res.status(201).send({ message: 'Estudante cadastrado com sucesso!' })
    } catch (error) {
      return res.status(400).send({ error: 'Falha ao cadastrar estudante' })
    }
  },

  async update (req, res) {
    const student = new Student(req.body.student)
    student.student_id = req.params.id
    try {
      await student.update()
      return res.status(200).send({ message: 'Estudante atualizado com sucesso!' })
    } catch (error) {
      return res.status(400).send({ error: 'Falha ao atualizar estudante' })
    }
  },

  async read (req, res) {
    const id = req.params.id
    const result = await Student.getStudent(id)
    res.status(200).send(result)
  },

  async readAll (req, res) {
    // Aqui vem o código para busca geral de estudante
    const result = await Student.allStudents()
    res.status(200).send(result)
  },

  async delete (req, res) {
    try {
      await Student.deleteStudent(req.params.id)
      res.status(200).send({ message: 'Cadastro deletado com sucesso!' })
    } catch (error) {
      res.status(400).send({ error: 'Falha ao deletar cadastro' })
    }
  }

}
