import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

let dbInstance: Db | null = null;

async function connectDB(): Promise<Db> {
  if (!dbInstance) {
    try {
      await client.connect();
      dbInstance = client.db();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }
  return dbInstance;
}

export default connectDB;
