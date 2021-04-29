'use strict'

const GetCount = require('../index')

function FakeCountApi() {
  this.get = async function(key) {
    if(key === 'UNKNOWN') {
      return {
        status: 404,
        value: 0
      }
    } else if (key === 'NORMAL') {
      return {
        status: 200,
        value: 42
      }
    } else if (key === 'OLD_STATE') {
      return { }
    }
  }
}

const countapi = new FakeCountApi()

describe('get count use case', () => {
  let getCountUseCase
  beforeAll(() => {
    getCountUseCase = new GetCount(countapi)
  })

  it('should be able to return the value 0 when there is no access', async () => {
    const result = await getCountUseCase.execute('UNKNOWN')
    
    expect(result).toBe(0)
  })

  it('should be able to return the correct count when the request returns status 200', async () => {
    const result = await getCountUseCase.execute('NORMAL')
    expect(result).toBe(42)
  })

  it('should be able to return the last correct count when some problem with the request occur', async () => {
    const result = await getCountUseCase.execute('OLD_STATE')
    expect(result).toBe(42)
  })
})