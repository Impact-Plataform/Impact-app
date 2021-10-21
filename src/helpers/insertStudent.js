
const db = require('../config/dbConnection')

class insert{

    static async insertStudent(name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, 
        employmentStatus, income, numberOfHousehold, familyIncome, rg, cpf, phone, email){

        await db.query("INSERT INTO students(name, surname, birthdate, city_of_birth, adress, education_level, marital_status, employment_status, income, number_of_household, family_income) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
        [name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, employmentStatus, income, numberOfHousehold, familyIncome])

        let studentId = await db.query("SELECT student_id FROM Students where name = $1 and surname = $2 and adress = $3 and birthdate = $4 and cast(created_at as varchar(10)) = cast(current_date as varchar(10))", 
        [name, surname, adress, birthDate])

        let id = studentId.rows[0].student_id

        if(phone !== ''){
            await db.query("INSERT INTO studentcontacts(student_id, contact_type, contact_description, contact_value) VALUES($1, $2, $3, $4)", 
            [id, 1, 'Phone', phone])
        }

        if(email !== ''){
            await db.query("INSERT INTO studentcontacts(student_id, contact_type, contact_description, contact_value) VALUES($1, $2, $3, $4)", 
            [id, 2, 'Email', email])
        }

        if(rg !== ''){
            await db.query("INSERT INTO studentdocuments(student_id, document_type, document_description, document_value) VALUES($1, $2, $3, $4)", 
            [id, 1, 'RG', rg])
        }

        if(cpf !== ''){
            await db.query("INSERT INTO studentdocuments(student_id, document_type, document_description, document_value) VALUES($1, $2, $3, $4)", 
            [id, 2, 'CPF', cpf])
        }

    }   

}

module.exports = insert

