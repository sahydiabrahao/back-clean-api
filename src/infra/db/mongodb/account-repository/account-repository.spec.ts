import { Mongohelper } from '../helpers/mongo-helper'
import { AccountMongoReository } from './Account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await Mongohelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await Mongohelper.disconnect()
  })

  test('Deve retornar account se sucesso -gravar no bd-', async () => {
    const sut = new AccountMongoReository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_passowrd'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email.mail.com')
    expect(account.password).toBe('any_passowrd')
  })
})
