const Student = require('../models/student')
const { getStudent, getAllStudents } = require('../helpers/getStudents')

module.exports = {

  async save (req, res) {
    const student = new Student(req.body)
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
      return res.status(200).send({ message: 'Cadastro atualizado com sucesso!' })
    } catch (error) {
      return res.status(400).send({ error: 'Falha ao atualizar cadastro' })
    }
  },

  async read (req, res) {
    const id = req.params.id
    try {
      const student = await getStudent(id)
      if (student === Error) {
        return res.status(400).send({ error: 'Estudante não encontrado' })
      } else {
        return res.status(200).send({ student })
      }
    } catch (error) {
      return res.status(500).send({ error: 'Falha ao buscar estudante' })
    }
  },

  async readAll (req, res) {
    try {
      // if (Object.keys(req.query).length > 0) {
      //   const params = req.url.split('?')[1]
      //   // params = params.split('&')
      //   // const jedi = params.find(el => el.indexOf('jedi') > -1)
      //   const students = await getAllStudents(params)
      //   return res.status(200).send({ students })
      // }
      const students = await getAllStudents()
      return res.status(200).send({ students })
    } catch (error) {
      return res.status(400).send({ error: 'Falha ao buscar estudantes' })
    }
  },

  async delete (req, res) {
    try {
      await Student.deleteStudent(req.params.id)
      return res.status(200).send({ message: 'Cadastro deletado com sucesso!' })
    } catch (error) {
      return res.status(400).send({ error: 'Falha ao deletar cadastro' })
    }
  }

}
