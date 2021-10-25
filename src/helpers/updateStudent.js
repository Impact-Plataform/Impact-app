
const db = require('../config/dbConnection')

class update{

    static async updateStudent(student_id, name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, 
        employmentStatus, income, numberOfHousehold, familyIncome, rg, cpf, phone, email){

            await db.query("UPDATE students SET name = $1, surname = $2, birthdate = $3, city_of_birth = $4, adress = $5, education_level = $6, marital_status = $7, employment_status = $8, income = $9, number_of_household = $10, family_income) = $11 WHERE student_id = $12",
            [name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, employmentStatus, income, numberOfHousehold, familyIncome, student_id])

            await db.query("UPDATE studentcontacts SET contact_value = $1 WHERE contact_type = 1 AND student_id = $2",
            [phone, student_id])

            await db.query("UPDATE studentcontacts SET contact_value = $1 WHERE contact_type = 2 AND student_id = $2",
            [email, student_id])

            await db.query("UPDATE studentdocuments SET document_value = $1 WHERE contact_type = 1 AND student_id = $2",
            [rg, student_id])

            await db.query("UPDATE studentdocuments SET document_value = $1 WHERE contact_type = 2 AND student_id = $2",
            [cpf, student_id])
    
    }

}

module.exports = update