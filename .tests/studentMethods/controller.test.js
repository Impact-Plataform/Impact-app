const axios = require('axios')
const crypto = require('crypto')
const { get } = require('http')
const studentController = require('../../src/controllers/studentController')

const generate = function () {
    return crypto.randomBytes(10).toString('hex')
}

const request = function (url, method, data) {
    return axios({ url, method, data, validateStatus: false })
}

const mockRequest = (body) => ({
    body
  });

test('Deve salvar um estudante', async function (){
    /* const req = mockRequest({name: 'testando', surname: 'testando', birthDate: '21/12/1900', cityOfBirth: 'testando', adress: 'testando', educationLevel: 'testando', 
    maritalStatus: 'testando', familyIncome: '+ 1000$', email: 'testando@gmail.com'
    }) */
    
    const student1 = await studentController.save()

    const response = await request('http://localhost:3000/student/saveStudents', 'post')

    expect(response.status).toBe(201)
})

test.only('Deve buscar os estudantes', async function() {
    const response = await request('http://localhost:3000/student/getStudents', 'get')
    
    expect(response.status).toBe(200)
})





/* const{
    name, surname, birthDate, cityOfBirth, adress, educationLevel, 
    maritalStatus, familyIncome, rg, cpf, phone, email, nameResponsible, contactResponsible, documentResponsible,
    nameSpouse, contactSpouse, documentSpouse
  } = req.body */