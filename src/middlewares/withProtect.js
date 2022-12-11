import User from '@models/User';
import { verifyAccess } from '@util/jwt';
import logger from '@util/logger';
import config from 'config';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

/**
 * @type {import('@types').MiddlewareCreator}
 */
export default function withProtect() {
  return function wrapper(handler) {
    return async (req, res) => {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(401).json({
          ok: false,
          error: 'Unauthorized',
        });
      }

      const token = authorization.split(' ')[1];

      const verify = verifyAccess(token);

      const user = await User.findOne(
        {
          'tokens.access': token,
        },
        {
          username: 1,
          email: 1,
          tokens: 1,
          tokenIndex: { $indexOfArray: ['$tokens.access', token] },
        }
      );

      if (!verify) {
        if (verify === 0) {
          return res.status(401).json({
            ok: false,
            error: 'Unauthorized',
          });
        }
        if (verify === -1) {
          user.tokens = user.tokens.filter((obj) => obj.access !== token);

          await user.save();

          return res.status(403).json({
            ok: false,
            error: 'Forbidden',
          });
        }
      }

      if (!user) {
        return res.status(403).json({
          ok: false,
          error: 'Forbidden',
        });
      }

      req.jwt = { user };

      await handler(req, res);
    };
  };
}
