'use strict'

const countapi = require('countapi-js')

const UpdateCount = require('../useCase/UpdateCount')

const COUNT_KEY = process.env.COUNT_KEY

module.exports.handle = async (event) => {
  const updateCount = new UpdateCount(countapi)

  try {
    const result = await updateCount.execute(COUNT_KEY)
    if(result.value) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.value)
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: result.error
        })
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error
      })
    }
  }
}
