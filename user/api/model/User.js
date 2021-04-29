'use strict'

module.exports = function User(repo) {
  this.repo = repo

  this.create = async function({name, email, cpf}) {
    return this.repo.create({name, email, cpf})
  }

  this.findById = async function(id) {
    return this.repo.findById(id)
  }

  this.findByEmail = async function (email) {
    try {
      const result = await this.repo.getMany({ email })
      return result.Items
    } catch(error) {
      throw new Error(error.message)
    }
  }

  this.findByCpf = async function (cpf) {
    try {
      const result = await this.repo.getMany({ cpf })
      return result.Items
    } catch(error) {
      throw new Error(error.message)
    }
  }
}