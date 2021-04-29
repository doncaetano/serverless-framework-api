'use strict'

const GetUser = require('../index')
const User = require('../../../model/__mock__/User')

describe('get user use case', () => {
  let getUserUseCase, userModule
  beforeAll(() => {
    userModule = new User()
    getUserUseCase = new GetUser(userModule)
  })

  it('should be able to find a users by id', async () => {
    const userCreated = await userModule.create({
      name: 'John Snow',
      email: 'johnsnow@gmail.com',
      cpf: '11122233344'
    })

    const id = userCreated.id
    const response = await getUserUseCase.execute(id)
    expect(response.user).toMatchObject(userCreated)
  })

  

  it('should be able to return undefined when no user was found', async () => {
    const response = await getUserUseCase.execute('a0f13a55-620d-4ce6-afc4-47c48a314ee2')
    expect(response.user).toBeUndefined()
  })
})