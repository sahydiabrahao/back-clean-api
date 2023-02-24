import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { AccountMongoReository } from '../../infra/db/mongodb/account-repository/Account';

import { SignUpController } from '../../presentation/controllers/signup/signup';
import { Controller } from '../../presentation/protocols';
import { EmailValidatorAdapter } from '../../util/email-validator-adapter';
import { LogControllerDecorator } from '../decorators/log';

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoReository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  return new LogControllerDecorator(signUpController)
}
