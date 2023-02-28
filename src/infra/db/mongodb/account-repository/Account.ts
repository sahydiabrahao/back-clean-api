import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository';
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { Mongohelper } from '../helpers/mongo-helper';

export class AccountMongoReository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await Mongohelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return Mongohelper.map(result.ops[0])
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await Mongohelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && Mongohelper.map(account)
  }
}
