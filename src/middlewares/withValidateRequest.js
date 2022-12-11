import logger from '@util/logger';
import Joi from 'joi';

/**
 * @type {import('@types').MiddlewareCreator}
 * @param {import('joi').Schema} validateSchema
 * @returns
 */
export default function withValidate(validateSchema) {
  return function wrapper(handler) {
    return async (req, res) => {
      if (!Joi.isSchema(validateSchema)) {
        throw new Error('Invalid schema pass in withValidate middleware');
      }

      return await validateSchema
        .validateAsync(req, {
          allowUnknown: true,
        })
        .then(async () => await handler(req, res))
        .catch((err) => {
          if (err instanceof Joi.ValidationError) {
            return res.status(400).json({
              ok: false,
              error: err.message,
            });
          } else {
            throw err;
          }
        });
    };
  };
}
