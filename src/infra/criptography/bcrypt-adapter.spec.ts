import bcrypt from 'bcrypt'
import { BcryptAdapt } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('Deve chamar Bcrypt com valores corretos', async () => {
    const salt = 12
    const sut = new BcryptAdapt(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Deve retornar hash se caso de sucesso', async () => {
    const salt = 12
    const sut = new BcryptAdapt(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
