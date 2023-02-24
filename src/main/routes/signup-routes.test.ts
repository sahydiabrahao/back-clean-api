import request from 'supertest'
import { Mongohelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await Mongohelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await Mongohelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = Mongohelper.getCollection('accounts')
    await accountCollection.deleteMany()
  })

  test('Deve retornar conta em caso de sucesso', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'João',
        email: 'joao_email@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
