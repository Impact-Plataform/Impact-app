
const db = require('../config/dbConnection')

class insert {
  static async insertStudent (name, surname, birthDate, cityOfBirth, adress, educationLevel, 
    maritalStatus, familyIncome, rg, cpf, phone, email, nameResponsible, contactResponsible, documentResponsible, 
    nameSpouse, contactSpouse, documentSpouse) {

    const studentId = await db.query('INSERT INTO students(name, surname, birthdate, city_of_birth, adress, education_level, marital_status, family_income) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING student_id',
      [name, surname, birthDate, cityOfBirth, adress, educationLevel, maritalStatus, familyIncome])

    const id = studentId.rows[0].student_id

    if (phone !== '') {
      await db.query('INSERT INTO studentcontacts(student_id, contact_type, contact_description, contact_value) VALUES($1, $2, $3, $4)',
        [id, 1, 'Phone', phone])
    }

    if (email !== '') {
      await db.query('INSERT INTO studentcontacts(student_id, contact_type, contact_description, contact_value) VALUES($1, $2, $3, $4)',
        [id, 2, 'Email', email])
    }

    if (rg !== '') {
      await db.query('INSERT INTO studentdocuments(student_id, document_type, document_description, document_value) VALUES($1, $2, $3, $4)',
        [id, 1, 'RG', rg])
    }

    if (cpf !== '') {
      await db.query('INSERT INTO studentdocuments(student_id, document_type, document_description, document_value) VALUES($1, $2, $3, $4)',
        [id, 2, 'CPF', cpf])
    }

    if(nameResponsible !== ''){
      await db.query('INSERT INTO studentresponsible(student_id, name, contact, document) VALUES($1, $2, $3, $4)',
        [id, nameResponsible, contactResponsible, documentResponsible])
    }

    if(nameSpouse !== ''){
      await db.query('INSERT INTO studentconjuge(student_id, name, contact, document) VALUES($1, $2, $3, $4)',
        [id, nameSpouse, contactSpouse, documentSpouse])
    }
  }
}

module.exports = insert
