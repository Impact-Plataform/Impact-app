
module.exports = {

  async isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  },

  async email (email) {
    if (email === '' | email.indexOf('@@') > -1 | email.indexOf('@') < 0 | email.indexOf('.com') < 0) {
      return false
    } else {
      return true
    }
  },

  async cpf (cpf) {
    let Soma = 0
    let Resto

    if (cpf === '00000000000') {
      return false
    }

    for (let i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }

    Resto = (Soma * 10) % 11

    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0
    }

    if (Resto !== parseInt(cpf.substring(9, 10))) {
      return false
    }

    Soma = 0
    for (let i = 1; i <= 10; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }

    Resto = (Soma * 10) % 11

    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0
    }

    if (Resto !== parseInt(cpf.substring(10, 11))) {
      return false
    }

    return true
  },

  async age (dataNasc) {
    const dataAtual = new Date()
    const anoAtual = dataAtual.getFullYear()
    const anoNascParts = dataNasc.split('/')
    const diaNasc = anoNascParts[0]
    const mesNasc = anoNascParts[1]
    const anoNasc = anoNascParts[2]
    let idade = anoAtual - anoNasc
    const mesAtual = dataAtual.getMonth() + 1

    // Se mes atual for menor que o nascimento, nao fez aniversario ainda;
    if (mesAtual < mesNasc) {
      idade--
    } else {
      // Se estiver no mes do nascimento, verificar o dia
      if (mesAtual === mesNasc) {
        // Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
        if (new Date().getDate() < diaNasc) {
          idade--
        }
      }
    }

    return idade
  },

  async validaBirthDate (birthDate) {
    const isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n)
    }

    if (birthDate[2] !== '/' || birthDate[5] !== '/') {
      return false
    } else {
      const anoNascParts = birthDate.split('/')
      const diaNasc = anoNascParts[0]
      const mesNasc = anoNascParts[1]
      const anoNasc = anoNascParts[2]

      if (!(isNumber(diaNasc)) || !(isNumber(mesNasc)) || !(isNumber(anoNasc))) {
        return false
      } else {
        return true
      }
    }
  }
}
