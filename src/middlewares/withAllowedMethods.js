import ch from '@util/createHandler';

/**
 * @type {import('@types').MiddlewareCreator}
 */
export default function withAllowedMethods(...methods) {
  return function wrapper(handler) {
    return ch(async (req, res) => {
      const { method } = req;

      if (methods.indexOf(method) < 0) {
        res.status(405).end();
      } else {
        await handler(req, res);
      }
    });
  };
}
