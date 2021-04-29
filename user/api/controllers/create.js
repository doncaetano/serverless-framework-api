'use strict'

const Joi = require('joi')
const repo = require('../repo')
const User = require('../model/User')
const CreateUser = require('../useCases/CreateUser')

module.exports.handle = async (event) => {
  const { name, email, cpf } = JSON.parse(event.body)

  const user = new User(repo)
  const createUser = new CreateUser(user)
  
  try {
    const schema = Joi.object().keys({
      name: Joi.string(),
      email: Joi.string(),
      cpf: Joi.string()
    })
    const { error, _ } = schema.validate({ name, email, cpf })

    if(error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Data is not in the correct format'
        })
      }
    }

    const result = await createUser.execute({ name, email, cpf })
    if (result.error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: result.error
        })
      }
    } else {
      return {
        statusCode: 201,
        body: JSON.stringify(result.user)
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }
}
