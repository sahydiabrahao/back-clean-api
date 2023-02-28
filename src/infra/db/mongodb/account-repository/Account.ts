import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { Mongohelper } from '../helpers/mongo-helper';

export class AccountMongoReository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await Mongohelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return Mongohelper.map(result.ops[0])
  }
}
