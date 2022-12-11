import logger from '../util/logger';
import rip from 'request-ip';

/**
 * @type {import('@types').MiddlewareCreator}
 */
export default function withLog() {
  return function wrapper(handler) {
    return async (req, res) => {
      const ip = rip.getClientIp(req);
      const userAgent = req.headers['user-agent'].split(' ')[0];
      const isAuthorized = !!req.headers.authorization && req.jwt;

      const logStart = '▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼\n';
      const logEnd = '▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲\n';

      /**
       * @param {'top' | 'bottom'} where
       * @param {string} logLine
       */
      const log = (where, logLine) =>
        `\n` +
        `REQUEST ${req.method} ${req.url}\n` +
        (where === 'top' ? logLine : '') +
        `IP ${ip}\n` +
        `User-Agent ${userAgent}\n` +
        (req.body ? `BODY ${JSON.stringify(req.body)}\n` : '') +
        (isAuthorized
          ? `USER ${req.jwt.user.username} | ${req.jwt.user.email}\n`
          : '') +
        (where === 'bottom' ? logLine : '');

      logger.info(log('top', logStart));

      await handler(req, res);

      logger.info(log('bottom', logEnd));
    };
  };
}
