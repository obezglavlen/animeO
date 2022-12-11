/**
 * @type {import('@types').Middleware}
 */
function createHandler(handler) {
  handler.withMiddlewares = function (...middlewares) {
    let modifiedHandler = this;

    middlewares.reverse().forEach((middleware) => {
      modifiedHandler = middleware(modifiedHandler);
    });

    return modifiedHandler;
  };

  return handler;
}

export default createHandler;
