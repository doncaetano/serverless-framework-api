'use strict'

const Joi = require('joi')
const repo = require('../repo')
const User = require('../model/User')
const GetUser = require('../useCases/GetUser')

module.exports.handle = async (event) => {
  const { id } = event.pathParameters
  
  if (id) {
    try {
      const schema = Joi.string().guid({ version: [ 'uuidv4' ] })
      const { error, _ } = schema.validate(id)
  
      if(error) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: 'Data is not in the correct format'
          })
        }
      }
      
      const user = new User(repo)
      const getUser = new GetUser(user)

      const result = await getUser.execute(id)
      if(result.user) {
        return {
          statusCode: 200,
          body: JSON.stringify(result.user)
        }
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({
            error: 'Resource was not found.'
          })
        }
      }
    } catch(error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message
        })
      }
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Id not informed'
      })
    }
  }
}

