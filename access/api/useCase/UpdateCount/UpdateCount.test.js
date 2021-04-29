'use strict'

const UpdateCount = require('./index')

function FakeCountApi() {
  this.hit = async function(key) {
    if(key === 'OK') {
      return {
        status: 200,
        value: 1
      }
    } else if (key === 'ERROR') {
      return {
        status: 400
      }
    }
  }
}

const countapi = new FakeCountApi()

describe('update count use case', () => {
  let updateCountUseCase
  beforeAll(() => {
    updateCountUseCase = new UpdateCount(countapi)
  })

  it('should be able to update and return the updated value', async () => {
    const result = await updateCountUseCase.execute('OK')
    expect(result).toMatchObject({
      value: 1
    })
  })

  it('should be able to return the correct count when the request returns status 200', async () => {
    const result = await updateCountUseCase.execute('ERROR')
    expect(result).toMatchObject({
      error: 'Some problem occurred while updating the value.'
    })
  })
})