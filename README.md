# Impact-app

### Rotas da api


| Recurso | URL                                 | Método | Código Esperado | Retorno Esperado                         |
| ------- | ----------------------------------- | ------ | --------------- | ---------------------------------------- |
| /register | https://impact-app.herokuapp.com/user/register | post   | 200             | Usuario criado com sucesso {nome, email} |
| /login | https://impact-app.herokuapp.com/user/login    | post   | 200             | Autenticado com sucesso {user,token}     |


| Recurso             | URL                                              | Método | Código Esperado | Retorno Esperado                  |
| ------------------- | ------------------------------------------------ | ------ | --------------- | --------------------------------- |
| /saveStudents       | https://impact-app.herokuapp.com/student/saveStudents       | post   | 201             | Estudante cadastrado com sucesso. |
| /getStudents        | https://impact-app.herokuapp.com/student/getAllStudents     | get    | 200             | Informação do recurso buscado     |
| /getStudent/:id     | https://impact-app.herokuapp.com/student/getStudent/:id     | get    | 200             | Informação do recurso buscado     |
| /updateStudents/:id | https://impact-app.herokuapp.com/student/updateStudents/:id | put    | 200             | A informação atualizada.          |
| /deleteStudents/:id | https://impact-app.herokuapp.com/student/deleteStudents/:id | delete | 204             | Estudante deletado com sucesso.   |

