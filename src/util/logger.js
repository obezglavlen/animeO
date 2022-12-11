import pino from 'pino';

const transport = pino.transport({
  target: 'pino-pretty',
});

const logger = pino(transport);
logger.level = process.env.NODE_ENV === 'production' ? 'error' : 'debug';

export default logger;
