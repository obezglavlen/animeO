import { connectDb } from '../util/db';
import ch from '@util/createHandler';

/**
 * @type {import('@types').MiddlewareCreator}
 */
export default function withDatabase() {
  return function wrapper(handler) {
    return ch(async (req, res) => {
      await connectDb();

      await handler(req, res);
    });
  };
}
