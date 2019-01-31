import { MongoClient, Db } from 'mongodb';

import { config } from './config';
import { IMessage } from './models/message';
import { IName } from './models/name';
import { IUser } from './models/user';
import { IMigration } from './models/migration';
import { ILog } from './models/logs';

let mongoClientDb: Db;

export async function getMongoClient(): Promise<MongoClient> {
  return new Promise(resolve => {
    MongoClient.connect(
      'mongodb://localhost/',
      { useNewUrlParser: true },
      async (err, client) => {
        if (err) {
          throw err;
        }

        mongoClientDb = client.db(config.db.name);

        return resolve(client);
      }
    );
  });
}

export const messagesCollection = () => mongoClientDb.collection<IMessage>('messages');
export const namesCollection = () => mongoClientDb.collection<IName>('names');
export const usersCollection = () => mongoClientDb.collection<IUser>('users');
export const migrationsCollection = () => mongoClientDb.collection<IMigration>('migrations');
export const logsCollection = () => mongoClientDb.collection<ILog>('logs');
