import { MongoClient } from 'mongodb'

const globalForMongo = globalThis as typeof globalThis & { lifeosMongo?: Promise<MongoClient> }

export async function getDb() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not configured')
  if (!globalForMongo.lifeosMongo) globalForMongo.lifeosMongo = new MongoClient(uri).connect()
  const client = await globalForMongo.lifeosMongo
  return client.db(process.env.MONGODB_DB || 'lifeos')
}
