
const db = require('../config/dbConnection')

class update {
  static async updateStudent (studentId, name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus,
    familyIncome, rg, cpf, phone, email, nameResponsible, contactResponsible, documentResponsible, 
    nameSpouse, contactSpouse, documentSpouse) {

    await db.query('UPDATE students SET name = $1, surname = $2, birthdate = $3, city_of_birth = $4, adress = $5, education_level = $6, marital_status = $7, family_income = $8 WHERE studentId = $9',
      [name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, familyIncome, studentId])

    await db.query('UPDATE studentcontacts SET contact_value = $1 WHERE contact_type = 1 AND studentId = $2',
      [phone, studentId])

    await db.query('UPDATE studentcontacts SET contact_value = $1 WHERE contact_type = 2 AND studentId = $2',
      [email, studentId])

    await db.query('UPDATE studentdocuments SET document_value = $1 WHERE contact_type = 1 AND studentId = $2',
      [rg, studentId])

    await db.query('UPDATE studentdocuments SET document_value = $1 WHERE contact_type = 2 AND studentId = $2',
      [cpf, studentId])

    await db.query('UPDATE studentresponsible SET name = $1, contact = $2, document = $3', 
    [nameResponsible, contactResponsible, documentResponsible])

    await db.query('UPDATE studentconjuge SET name = $1, contact = $2, document = $3', 
    [nameSpouse, contactSpouse, documentSpouse])
  }
}

module.exports = update
