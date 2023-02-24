import { LogErrorRepository } from '../../../../data/protocols/log-error-repository';
import { Mongohelper } from '../helpers/mongo-helper';

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await Mongohelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
