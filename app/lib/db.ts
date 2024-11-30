import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DB_URL ?? '')

await client.connect()

const dbName = 'local'
const collectionName = 'photo'

const database = client.db(dbName)
const collection = database.collection(collectionName)

export function getUserData(id: string) {
  collection.findOne({
    userId: id
  })
}
