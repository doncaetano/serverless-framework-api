'use strict'

const { v4: uuidv4 } = require('uuid')

module.exports = function User() {
  this.repo = []

  this.create = async function({name, email, cpf}) {
    const user = {
      id: uuidv4(),
      name, 
      email, 
      cpf,
      createdAt: (new Date()).toISOString()
    }

    this.repo.push(user)

    return user
  }

  this.findById = async function(id) {
    return this.repo.find(user => user.id === id)
  }

  this.findByEmail = async function (email) {
    return this.repo.filter(user => user.email === email)
  }

  this.findByCpf = async function (cpf) {
    return this.repo.filter(user => user.cpf === cpf)
  }
}