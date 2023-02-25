import { MissingParamError } from "../../errors"
import { badRequest } from "../../helpers/http-helper"
import { LoginController } from "./login"

interface SutTypes {
  sut: LoginController
}

const makeSut = (): any => {
  const sut = new LoginController()
  return {
    sut,
  }
}

describe('Login Controller', () => {
  test('Deve retornar 400 se o email não for fornecido',async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Deve retornar 400 se o password não for fornecido',async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
