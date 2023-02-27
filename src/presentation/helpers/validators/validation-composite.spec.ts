import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('Deve retornar erro se alguma validação retornar erro', () => {
    class ValidationStub implements Validation {
      validate (input: any): MissingParamError {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({
      field: 'any_value'
    })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
