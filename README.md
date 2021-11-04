# Impact-app

### Rotas da api

```
~~~Rotas do Usuário
| Recurso | URL                                 | Método | Código Esperado | Retorno Esperado                         |
| ------- | ----------------------------------- | ------ | --------------- | ---------------------------------------- |
| /signup | http://localhost:5000/user/register | post   | 200             | Usuario criado com sucesso {nome, email} |
| /signin | http://localhost:5000/user/login    | post   | 200             | Autenticado com sucesso {user,token}     |
~~~

~~~Rotas de Estudante
| Recurso             | URL                                              | Método | Código Esperado | Retorno Esperado                  |
| ------------------- | ------------------------------------------------ | ------ | --------------- | --------------------------------- |
| /saveStudents       | http://localhost:5000/student/saveStudents       | post   | 201             | Estudante cadastrado com sucesso. |
| /getStudents        | http://localhost:5000/student/getAllStudents     | get    | 200             | Informação do recurso buscado     |
| /getStudent/:id     | http://localhost:5000/student/getStudent/:id     | get    | 200             | Informação do recurso buscado     |
| /updateStudents/:id | http://localhost:5000/student/updateStudents/:id | put    | 200             | A informação atualizada.          |
| /deleteStudents/:id | http://localhost:5000/student/deleteStudents/:id | delete | 204             | Estudante deletado com sucesso.   |
~~~
```

