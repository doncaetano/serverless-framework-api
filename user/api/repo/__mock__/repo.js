'use strict'

const { DocumentClient } = require('aws-sdk/clients/dynamodb')
const { v4: uuidv4 } = require('uuid')

const TABLE_NAME = process.env.TABLE_NAME || 'user'

const config = {
  convertEmptyValues: true,
  endpoint: 'localhost:8000',
  sslEnabled: false,
  region: 'local-env'
}
const dynamoDbClient = new DocumentClient(config)

function Repo(TableName) {
  this.TableName = TableName

  this.create = async function({name, email, cpf}) {
    const params = {
      TableName: this.TableName,
      Item: {
        id: uuidv4(),
        name,
        email,
        cpf,
        createdAt: (new Date()).toISOString()
      }
    }
    await dynamoDbClient.put(params).promise()
    .catch(function(error) {
      throw new Error(error.message)
    })

    return params.Item
  }

  this.findById = async function(id) {
    const user = await dynamoDbClient.get({
      TableName: this.TableName,
      Key: {
        id
      }
    }).promise()
    .catch(function(error) {
      throw new Error(error.message)
    })

    return user.Item
  }

  this.getMany = async function(object) {
    const FilterExpression = Object.keys(object).map(key => `${key} = :${key}`).join(' AND ')
    const ExpressionAttributeValues = {}
    Object.keys(object).forEach(key => {
      ExpressionAttributeValues[`:${key}`] = object[key]
    })

    return await dynamoDbClient.scan({
      TableName: this.TableName,
      FilterExpression,
      ExpressionAttributeValues
    }).promise()
    .catch(function(error) {
      throw new Error(error.message)
    })
  }  
}

const repo = new Repo(TABLE_NAME)
module.exports = repo
