'use strict'

const countapi = require('countapi-js')

const GetCount = require('../useCase/GetCount')

const COUNT_KEY = process.env.COUNT_KEY

module.exports.handle = async (event) => {
  const getCount = new GetCount(countapi)

  try {
    const count = await getCount.execute(COUNT_KEY)
    return {
      statusCode: 200,
      body: JSON.stringify(count)
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
