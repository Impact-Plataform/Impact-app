module.exports = (birth) => {
  const thisYear = new Date().getFullYear()
  const birthdate = new Date(birth.split('/').reverse().join('/')).getFullYear()
  const age = thisYear - birthdate
  if (age < 18) {
    return true
  }
  return false
}
