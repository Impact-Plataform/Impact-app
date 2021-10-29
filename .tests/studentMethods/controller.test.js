const axios = require('axios')
const crypto = require('crypto')
const studentController = require('../../src/controllers/studentController')

const generate = function () {
    return crypto.randomBytes(10).toString('hex')
}

const request = function (url, method, data) {
    return axios({ url, method, data, validateStatus: false })
}

test.only('Deve salvar um estudante', async function (){
    const res = {name: 'testando', surname: 'testando', birthDate: '21/12/1900', cityOfBirth: 'testando', adress: 'testando', educationLevel: 'testando', 
        maritalStatus: 'testando', familyIncome: '+ 1000$', email: 'testando@gmail.com'}
    const student1 = await studentController.save()

    const response = await request('ttp://localhost:3000/student/saveStudents', 'post')

    //expect(response.status).toBe(201)
})


/* const{
    name, surname, birthDate, cityOfBirth, adress, educationLevel, 
    maritalStatus, familyIncome, rg, cpf, phone, email, nameResponsible, contactResponsible, documentResponsible,
    nameSpouse, contactSpouse, documentSpouse
  } = req.body */