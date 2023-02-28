import { Mongohelper } from '../helpers/mongo-helper'
import { AccountMongoReository } from './account-mongo-repository'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await Mongohelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await Mongohelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await Mongohelper.getCollection('accounts')
    await accountCollection.deleteMany()
  })

  test('Deve retornar conta caso account.add for sucesso -gravar no bd-', async () => {
    const sut = new AccountMongoReository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_passowrd'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_passowrd')
  })

  test('Deve retornar conta caso account.loadByEmail for sucesso', async () => {
    const sut = new AccountMongoReository()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_passowrd'
    })
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_passowrd')
  })

  test('Deve retornar nulo caso account.loadByEmail falhar', async () => {
    const sut = new AccountMongoReository()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('Deve atualizar o token da conta caso account.updateAccessToken for sucesso', async () => {
    const sut = new AccountMongoReository()
    const res = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_passowrd'
    })
    const fakeAccount = res.ops[0]
    expect(fakeAccount.accessToken).toBeFalsy()
    await sut.updateAccessToken(fakeAccount._id, 'any_token')
    const account = await accountCollection.findOne({ _id: fakeAccount._id })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
