const insert = require('../helpers/insertStudent')
const load = require('../helpers/loadStudent')
const update = require('../helpers/updateStudent')
const erase = require('../helpers/deleteStudent')

class Student {

    constructor(name, surname, adress, birthdate, cityOfBirth,
        educationLevel, maritalStatus, familyIncome, numberOfHousehold, employmentStatus,
        income, contact, document) {
        this.name = name
        this.surname = surname
        this.birthdate = birthdate
        this.cityOfBirth = cityOfBirth
        this.adress = adress
        this.educationLevel = educationLevel
        this.maritalStatus = maritalStatus
        this.employmentStatus = employmentStatus
        this.income = income
        this.numberOfHousehold = numberOfHousehold
        this.familyIncome = familyIncome
        this.contact = contact
        this.document = document
    }

    static async create(name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, 
        employmentStatus, income, numberOfHousehold, familyIncome, rg, cpf, phone, email){

        await insert.insertStudent(name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, 
            employmentStatus, income, numberOfHousehold, familyIncome, rg, cpf, phone, email)
    }

    static async update(student_id, name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, 
        employmentStatus, income, numberOfHousehold, familyIncome, rg, cpf, phone, email){

        await update.updateStudent(student_id, name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, 
            employmentStatus, income, numberOfHousehold, familyIncome, rg, cpf, phone, email)
    }

    static async deleteStudent(id){
        await erase.deleteStudent(id)
    }

    static async allStudents(){
        return await load.allStudents()
    }

    static async oneStudent(id){
        return await load.oneStudent(id)
        
    }

}

module.exports = Student