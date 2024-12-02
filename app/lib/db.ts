import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Need Mongodb URI')
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}

let client: MongoClient

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & { _mongoClient?: MongoClient }

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  client = new MongoClient(uri, options)
}

export default client

// const client = new MongoClient(process.env.DB_URL ?? '')

// await client.connect()

// const dbName = 'local'
// const collectionName = 'photo'

// const database = client.db(dbName)
// const collection = database.collection(collectionName)

// export function getUserData(id: string) {
//   collection.findOne({
//     userId: id
//   })
// }

// // export function getOrCreateUserData(user: )
