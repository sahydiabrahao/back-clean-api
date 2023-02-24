import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Deve retornar account se sucesso', async () => {
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
