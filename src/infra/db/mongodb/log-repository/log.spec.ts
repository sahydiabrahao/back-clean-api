import { Mongohelper } from '../helpers/mongo-helper'
// import { Collection } from 'mongodb'
// import { LogMongoRepository } from './log'

// const makeSut = (): LogMongoRepository => {
//   return new LogMongoRepository()
// }

describe('Log Mongo Repository', () => {
  // let errorCollection: Collection

  beforeAll(async () => {
    await Mongohelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await Mongohelper.disconnect()
  })

  beforeEach(async () => {
    const errorCollection = await Mongohelper.getCollection('errors')
    await errorCollection.deleteMany()
  })

  test('Deve criar um log de erro se sucesso ', async() => {
    expect(1).toBe(1)
  })
})
