import request from 'supertest'
import { Mongohelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
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
  describe('POST /signup', () => {
    test('Deve retornar 200 signup', async () => {
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

  describe('POST /login', () => {
    test('Deve retornar 200 login', async () => {
      const pasword = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'João',
        email: 'joao_email@mail.com',
        password: pasword
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'joao_email@mail.com',
          password: '123'

        })
        .expect(200)
    })
    test('Deve retornar 200 login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'joao_email@mail.com',
          password: '123'

        })
        .expect(401)
    })
  })
})
