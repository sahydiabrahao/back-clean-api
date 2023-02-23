import { MongoClient, Collection } from 'mongodb'

export const Mongohelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect () {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
