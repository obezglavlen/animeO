import mongoose from 'mongoose';
import config from 'config';
import logger from '@util/logger';

/**
 * @type {{user: string, pass: string}} connectionOptions
 */
const connectionOptions = config.get('mongo.connectionOptions');
const url = config.get('mongo.url');

/**
 * @type {{
 *    conn?: mongoose.Connection | mongoose,
 *    promise?: Promise<mongoose.Connection | mongoose>
 *  }}
 */
let cached = global.mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
}

export async function connectDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(url, connectionOptions)
      .then((conn) => conn);
  }

  logger.debug('Connecting to mongoDb');

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise == null;
    logger.error(err);
    throw err;
  }

  return cached.conn;
}
