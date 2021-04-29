'use strict'

module.exports = function CreateUser(user) {
  this.user = user

  this.execute = async function({ name, email, cpf }) {
    let error
    if(!isValidEmail(email)) {
      error = 'Invalid email.'
    } else if ((await this.user.findByEmail(email)).length > 0) {
      error = 'Email address is already in use.'
    } else if ((await this.user.findByCpf(cpf)).length > 0) {
      error = 'Cpf is already in use.'
    }

    if(!error) {
      const user = await this.user.create({name, email, cpf})
      return {
        user
      }
    } else {
      return {
        error
      }
    }
    
  }
}

function isValidEmail (email) {
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  return emailRegex.test(email)
}






