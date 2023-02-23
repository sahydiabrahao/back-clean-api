import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';

export class AccountMongoReository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    return new Promise(resolve => resolve(null))
  }
}
