import logger from '../util/logger';

/**
 * @type {import('@types').MiddlewareCreator}
 */
export default function withErrorHandle() {
  return function wrapper(handler) {
    return async (req, res) => {
      try {
        await handler(req, res);
      } catch (err) {
        res.status(500).json({
          ok: false,
          error: 'Oops.. Something went wrong!',
        });

        logger.error(err);
      }
    };
  };
}
