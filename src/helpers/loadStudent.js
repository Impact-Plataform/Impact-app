
const db = require('../config/dbConnection')

class load{

    static async allStudents(){

        let studentsArray = []
        let students = await db.query('SELECT * FROM students')
        
        for(var i = 0; i < students.rows.length; i++){

            let student = students.rows[i]
            let id = students.rows[i].student_id
            let contacts = await db.query('SELECT contact_type, contact_description, contact_value FROM studentcontacts WHERE student_id = $1',[id])
            let documents = await db.query('SELECT document_type, document_description, document_value FROM studentdocuments WHERE student_id = $1',[id])
            
            let studentJson = {}

            studentJson.student = student
            studentJson.contacts = contacts.rows
            studentJson.documents = documents.rows

            studentsArray.push(studentJson)
        }
        return studentsArray
    }

    static async oneStudent(id){

        let students = await db.query('SELECT * FROM students WHERE student_id = $1', [id])
        let contacts = await db.query('SELECT contact_type, contact_description, contact_value FROM studentcontacts WHERE student_id = $1',[id])
        let documents = await db.query('SELECT document_type, document_description, document_value FROM studentdocuments WHERE student_id = $1',[id])        
    
        let studentJson = {}
    
        studentJson.student = students.row
        studentJson.contacts = contacts.rows
        studentJson.documents = documents.rows
        
       return studentJson
    
    }

}

module.exports = load