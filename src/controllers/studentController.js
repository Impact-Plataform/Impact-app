// const db = require('../config/dbConnection')
const student = require('../models/student')
const valida = require('./validaDados')

module.exports = {

  async save (req, res) {
    // Aqui vem o código para cadastro do estudante no banco de dados
    const {
      name, surname, birthDate, cityOfBirth, adress, educationLevel, 
      maritalStatus, familyIncome, rg, cpf, phone, email, nameResponsible, contactResponsible, documentResponsible,
      nameSpouse, contactSpouse, documentSpouse
    } = req.body

    if(name === '' || surname === '' || birthDate === '' || cityOfBirth === '' || adress === '' 
    || educationLevel === '' || maritalStatus === '' || familyIncome === '' || rg === ''
    || cpf === '' || phone === '' || email === ''){
      return res.status(400).send({message: 'Dados do aluno, não preenchidos!'})
    }

    if(!(await valida.validaBirthDate(birthDate))){
      return res.status(400).send({message: 'Data de nascimento inválida!'})
    }

    const checkAge = await valida.age(birthDate)
    if(checkAge < 18){
      if(nameResponsible == '' || contactResponsible == '' || documentResponsible == ''){
        return res.status(400).send({message: 'Para menores de 18 anos, favor inserir os dados do responsável!'})
      }
      else{
        const responsibleDocument = await valida.isNumber(documentResponsible)
        const responsibleContact = await valida.isNumber(contactResponsible)
        if (!responsibleDocument || !responsibleContact) {
          return res.status(400).send({message: 'Documento do responsável inválido contém letras!' })
        }
        else{
          if(!(await valida.cpf(documentResponsible))){
            return res.status(400).send({message: 'CPF do responsável inválido!' })
          }
        }
      }
    }

    if(contactSpouse != ''){
      if (!(await valida.isNumber(contactSpouse))) {
        return res.status(400).send({ errors: 'Contato do conjuge inválido contém letras!!' })
      }
    }

    if(documentSpouse != ''){
      if (!(await valida.isNumber(documentSpouse))) {
        return res.status(400).send({ errors: 'Document do conjuge inválido contém letras!!' })
      }
    }

    const rgIsnumber = await valida.isNumber(rg)
    if (!rgIsnumber) {
      return res.status(400).send({ errors: 'RG inválido contém letras!!' })
    }

    if(phone != ''){
      const contactIsNumber = await valida.isNumber(phone)
      if(!contactIsNumber){
        return res.status(400).send({ errors: 'Contato inválido contém letras!!' })
      }
    }

    const cpfIsnumber = await valida.isNumber(cpf)
    if (!cpfIsnumber) {
      return res.status(400).send({ errors: 'CPF inválido contém letras!!' })
    }

    const validaCpf = await valida.cpf(cpf)
    if (!validaCpf) {
      return res.status(400).send({ errors: 'CPF Inválido!!' })
    }

    const validaEmail = await valida.email(email)
    if (!validaEmail) {
      return res.status(400).send({ errors: 'Email invalido' })
    }

    const result = await student.create(
      name, surname, birthDate, cityOfBirth, adress, educationLevel, 
      maritalStatus, familyIncome, rg, cpf, phone, email, 
      nameResponsible, contactResponsible, documentResponsible,
      nameSpouse, contactSpouse, documentSpouse
    )

    return res.status(201).send({ message: 'Estudante cadastrado com sucesso!' })
    
  },

  async update (req, res) {
    // Aqui vem o código para atualizar informações do estudante
    const {
      studentId, name, surname, birthDate, cityOfBirth, adress, educationLevel, 
      maritalStatus, familyIncome, rg, cpf, phone, email, 
      nameResponsible, contactResponsible, documentResponsible,
      nameSpouse, contactSpouse, documentSpouse
    } = req.body

    await student.update(
      studentId, name, surname, birthDate, cityOfBirth, adress, educationLevel, 
      maritalStatus, familyIncome, rg, cpf, phone, email, 
      nameResponsible, contactResponsible, documentResponsible,
      nameSpouse, contactSpouse, documentSpouse)

    res.status(200).send({message: "Cadastro atualizado com sucesso!"})
  },

  async read (req, res) {
    // Aqui vem o código para busca individual de estudante
    const id = req.params.id
    const result = await student.oneStudent(id)
    res.status(200).send(result)
  },

  async readAll (req, res) {
    // Aqui vem o código para busca geral de estudante
    const result = await student.allStudents()
    res.status(200).send(result)
  },

  async delete (req, res) {
    // Aqui vem o código para excluir um cadastro
    const id = req.params.id
    await student.deleteStudent(id)
    res.status(200).send({message: "Cadastro deletado com sucesso!"})
  }

}
